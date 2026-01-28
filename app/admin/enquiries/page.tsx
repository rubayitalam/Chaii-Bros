"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy, updateDoc, doc, deleteDoc } from "firebase/firestore";
import type { Enquiry } from "@/lib/types";
import { FiMail, FiCheck, FiTrash2, FiClock, FiUser, FiCalendar, FiBox, FiMessageSquare } from "react-icons/fi";

export default function AdminEnquiriesInbox() {
    const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, "enquiries"), orderBy("timestamp", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setEnquiries(snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                timestamp: doc.data().timestamp?.toDate(),
            } as Enquiry)));
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const updateStatus = async (id: string, status: Enquiry["status"]) => {
        try {
            await updateDoc(doc(db, "enquiries", id), { status });
        } catch (err) {
            console.error("Error updating status:", err);
        }
    };

    const deleteEnquiry = async (id: string) => {
        if (!window.confirm("Archive this communication permanently?")) return;
        try {
            await deleteDoc(doc(db, "enquiries", id));
        } catch (err) {
            console.error("Error deleting enquiry:", err);
        }
    };

    if (loading) return (
        <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-copper border-t-transparent rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-copper/10 pb-8">
                <div>
                    <h2 className="text-3xl font-script text-brown mb-1">Customer <span className="text-copper">Correspondence</span></h2>
                    <p className="text-sm text-brown/50 font-sans tracking-wide">Secure records of all booking enquiries and messages from your high-value clients.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8 pb-32">
                {enquiries.length === 0 ? (
                    <div className="py-40 text-center bg-copper/5 rounded-[3rem] border-2 border-dashed border-copper/20">
                        <FiMail size={64} className="mx-auto text-copper/20 mb-6" />
                        <h4 className="text-xl font-serif text-brown/40 italic">The inbox is currently serene</h4>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-copper/30 mt-4">New submissions will appear here instantly</p>
                    </div>
                ) : (
                    enquiries.map((enquiry) => (
                        <div
                            key={enquiry.id}
                            className={`group bg-white rounded-[2.5rem] shadow-xl border overflow-hidden transition-all duration-500 ${enquiry.status === "new"
                                ? "border-copper shadow-copper/10"
                                : "border-copper/5 opacity-80"
                                }`}
                        >
                            <div className="flex flex-col xl:flex-row">
                                {/* Header / Client Info */}
                                <div className="p-8 lg:p-10 xl:w-1/3 bg-[#F7F3EF] border-r border-copper/5 flex flex-col justify-between">
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg ${enquiry.status === 'new' ? 'bg-copper' : 'bg-brown'}`}>
                                                <FiUser size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-script text-brown leading-none">{enquiry.name}</h3>
                                                <p className="text-[10px] font-bold text-copper uppercase tracking-widest mt-1">Valued Prospect</p>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3 text-brown/60">
                                                <FiMail className="shrink-0 text-copper" />
                                                <span className="text-xs font-sans truncate">{enquiry.email}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-brown/60">
                                                <FiCalendar className="shrink-0 text-copper" />
                                                <span className="text-xs font-sans">{enquiry.timestamp?.toLocaleString('en-GB', { dateStyle: 'long', timeStyle: 'short' }) || "Recently recieved"}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-brown/60">
                                                <FiBox className="shrink-0 text-copper" />
                                                <span className="text-xs font-bold uppercase tracking-widest text-copper">{enquiry.eventType} Booking</span>
                                            </div>
                                        </div>
                                    </div>

                                    {enquiry.status === 'new' && (
                                        <div className="mt-8 px-4 py-2 bg-copper text-white text-[10px] font-bold rounded-full uppercase tracking-[0.3em] text-center shadow-lg shadow-copper/20 animate-pulse">
                                            Awaiting Action
                                        </div>
                                    )}
                                </div>

                                {/* Body / Message */}
                                <div className="p-8 lg:p-10 flex-grow relative flex flex-col justify-between">
                                    <div className="absolute top-10 right-10">
                                        <FiMessageSquare size={40} className="text-copper/5" />
                                    </div>

                                    <div className="space-y-4 relative">
                                        <h4 className="text-[10px] font-bold text-brown/30 uppercase tracking-[0.2em] flex items-center gap-2">
                                            Client Message Content
                                        </h4>
                                        <p className="text-lg font-serif text-brown leading-relaxed italic border-l-2 border-copper/20 pl-6 py-2">
                                            &quot;{enquiry.message}&quot;
                                        </p>
                                    </div>

                                    <div className="mt-12 flex items-center justify-end gap-4">
                                        <button
                                            onClick={() => deleteEnquiry(enquiry.id)}
                                            className="px-6 py-3 text-[10px] font-bold text-red-400 uppercase tracking-widest hover:text-red-600 transition-colors flex items-center gap-2 group"
                                        >
                                            <FiTrash2 size={14} className="group-hover:rotate-12 transition-transform" />
                                            Archive Record
                                        </button>

                                        {enquiry.status === "new" ? (
                                            <button
                                                onClick={() => updateStatus(enquiry.id, "read")}
                                                className="px-8 py-4 bg-brown text-cream rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-copper transition-all shadow-xl shadow-brown/10 flex items-center gap-3 active:scale-95"
                                            >
                                                <FiCheck size={16} /> Mark as Reviewed
                                            </button>
                                        ) : (
                                            <div className="px-8 py-4 bg-copper/5 border border-copper/10 text-copper/40 rounded-2xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-3 cursor-default">
                                                <FiCheckCircle size={16} /> Confirmed Audit
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

function FiCheckCircle(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
    );
}

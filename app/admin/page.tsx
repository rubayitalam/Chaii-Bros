"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import type { Enquiry } from "@/lib/types";
import { FiUsers, FiMail, FiArrowRight, FiActivity, FiStar, FiCalendar } from "react-icons/fi";

export default function AdminDashboard() {
    const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
    const [stats, setStats] = useState({
        totalEnquiries: 0,
        newEnquiries: 0,
    });

    useEffect(() => {
        const enquiriesQuery = query(
            collection(db, "enquiries"),
            orderBy("timestamp", "desc")
        );

        const unsubscribe = onSnapshot(enquiriesQuery, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
                timestamp: doc.data().timestamp?.toDate(),
            } as Enquiry));

            setEnquiries(data);
            setStats({
                totalEnquiries: data.length,
                newEnquiries: data.filter((e) => e.status === "new").length,
            });
        }, (err) => {
            console.error("Dashboard listener failed:", err);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="space-y-12 pb-20">
            {/* Header Section */}
            <div>
                <h1 className="text-4xl font-script text-brown mb-2">
                    Executive <span className="text-copper">Overview</span>
                </h1>
                <p className="text-sm text-brown/50 font-sans tracking-wide">Snapshot of your brand&apos;s performance and recent interactions.</p>
            </div>

            {/* Premium Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-copper/5 group">
                    <div className="w-12 h-12 bg-copper/10 rounded-2xl flex items-center justify-center text-copper mb-6 group-hover:scale-110 transition-transform">
                        <FiMail size={24} />
                    </div>
                    <h3 className="text-[10px] font-bold text-brown/40 uppercase tracking-[0.2em] mb-1">Total Enquiries</h3>
                    <p className="text-4xl font-script text-brown tracking-tight">{stats.totalEnquiries}</p>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-copper/5 border-l-4 border-l-copper group">
                    <div className="w-12 h-12 bg-copper text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-copper/20 group-hover:rotate-12 transition-transform">
                        <FiActivity size={24} />
                    </div>
                    <h3 className="text-[10px] font-bold text-copper uppercase tracking-[0.2em] mb-1">Unread Submission</h3>
                    <p className="text-4xl font-script text-brown tracking-tight">{stats.newEnquiries}</p>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-copper/5 group">
                    <div className="w-12 h-12 bg-brown text-cream rounded-2xl flex items-center justify-center mb-6 group-hover:-translate-y-1 transition-transform">
                        <FiStar size={24} />
                    </div>
                    <h3 className="text-[10px] font-bold text-brown/40 uppercase tracking-[0.2em] mb-1">Site Health</h3>
                    <p className="text-4xl font-script text-brown tracking-tight">Optimal</p>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-copper/5 flex flex-col justify-center">
                    <h3 className="text-[10px] font-bold text-brown/40 uppercase tracking-[0.2em] mb-4 text-center">Quick Access</h3>
                    <div className="flex flex-col gap-2">
                        <Link href="/admin/homepage" className="flex items-center justify-between px-5 py-3 bg-[#F7F3EF] rounded-xl text-xs font-bold text-brown hover:bg-copper hover:text-white transition-all group">
                            <span>Edit Hero</span>
                            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link href="/admin/enquiries" className="flex items-center justify-between px-5 py-3 bg-[#F7F3EF] rounded-xl text-xs font-bold text-brown hover:bg-copper hover:text-white transition-all group">
                            <span>View All</span>
                            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Recent Activity Table */}
            <div className="bg-white rounded-[3rem] shadow-2xl border border-copper/5 overflow-hidden">
                <div className="px-10 py-8 border-b border-copper/5 flex justify-between items-center">
                    <h2 className="text-2xl font-script text-brown">Recent <span className="text-copper">Customer Inquiries</span></h2>
                    <Link href="/admin/enquiries" className="text-[10px] font-bold text-copper uppercase tracking-widest hover:underline">View Full Inbox</Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-[#F7F3EF]">
                            <tr>
                                <th className="px-10 py-5 text-left text-[10px] font-bold text-brown/40 uppercase tracking-widest">Client Name</th>
                                <th className="px-10 py-5 text-left text-[10px] font-bold text-brown/40 uppercase tracking-widest">Event Nature</th>
                                <th className="px-10 py-5 text-left text-[10px] font-bold text-brown/40 uppercase tracking-widest">Status</th>
                                <th className="px-10 py-5 text-left text-[10px] font-bold text-brown/40 uppercase tracking-widest">Recieved</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-copper/5">
                            {enquiries.slice(0, 5).map((enquiry) => (
                                <tr key={enquiry.id} className="hover:bg-copper/5 transition-colors group">
                                    <td className="px-10 py-6">
                                        <div className="flex flex-col">
                                            <span className="text-base font-serif text-brown font-medium">{enquiry.name}</span>
                                            <span className="text-[10px] text-brown/40 font-sans tracking-wide">{enquiry.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-6">
                                        <span className="px-3 py-1 bg-copper/10 text-copper rounded-full text-[10px] font-bold uppercase tracking-widest">{enquiry.eventType}</span>
                                    </td>
                                    <td className="px-10 py-6">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${enquiry.status === 'new' ? 'bg-copper animate-pulse' : 'bg-green-400'}`} />
                                            <span className={`text-[10px] font-bold uppercase tracking-widest ${enquiry.status === 'new' ? 'text-copper' : 'text-brown/40'}`}>
                                                {enquiry.status === 'new' ? 'Awaiting Action' : 'Reviewed'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-6 text-sm font-serif text-brown/60 italic">
                                        {enquiry.timestamp instanceof Date ? enquiry.timestamp.toLocaleDateString('en-GB') : "Recently"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

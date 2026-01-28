import { cn } from "@/lib/utils";

const TrustedBySection = () => {
    const partners = [
        { name: "The Orangery", style: "font-script text-2xl md:text-3xl text-muted-foreground" },
        { name: "DoubleTree by Hilton", style: "font-display text-lg md:text-xl tracking-wide text-muted-foreground" },
        { name: "VARANASI", style: "font-display text-xl md:text-2xl tracking-[0.2em] font-medium text-muted-foreground" },
        { name: "Expedia", style: "font-display text-xl md:text-2xl tracking-wide text-muted-foreground" },
        { name: "ICC WALES", style: "font-display text-xl md:text-2xl tracking-[0.15em] font-medium text-muted-foreground" },
    ];

    return (
        <section className="bg-background py-16 md:py-20 border-b border-border">
            <div className="container mx-auto px-6 md:px-12 lg:px-20">
                {/* Title */}
                <div className="text-center mb-12">
                    <h2 className="inline-flex items-center gap-3">
                        <span className="font-script text-3xl md:text-4xl text-foreground">Trusted</span>
                        <span className="font-display text-lg md:text-xl tracking-[0.2em] uppercase text-primary">BY THE BEST</span>
                    </h2>
                </div>

                {/* Partner Logos */}
                <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-8 md:gap-12 lg:gap-16">
                    {partners.map((partner) => (
                        <div key={partner.name} className={cn("text-center", partner.style)}>
                            {partner.name}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustedBySection;

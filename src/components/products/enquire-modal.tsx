"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; // Assuming you have this or use standard textarea
import { Loader2, Mail } from "lucide-react";

interface EnquireModalProps {
    productName: string;
    trigger?: React.ReactNode;
    prefilledMessage?: string;
}

export function EnquireModal({ productName, trigger, prefilledMessage }: EnquireModalProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);

        try {
            await fetch('/api/contact', {
                method: 'POST',
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    message: `Enquiry for ${productName}: ${data.message}`,
                })
            });
            setSubmitted(true);
        } catch (error) {
            console.error("Failed to send enquiry", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || <Button variant="outline">Enquire Now</Button>}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-[#F5F5F4] text-black border-black/10">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold uppercase tracking-wider">Get a Quote</DialogTitle>
                    <DialogDescription>
                        Request pricing for <span className="font-semibold text-primary">{productName}</span>.
                    </DialogDescription>
                </DialogHeader>

                {!submitted ? (
                    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="name" required className="bg-black/5 border-black/10" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" required className="bg-black/5 border-black/10" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input id="phone" name="phone" type="tel" className="bg-black/5 border-black/10" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="message">Message / Quantity</Label>
                            <textarea
                                id="message"
                                name="message"
                                rows={3}
                                defaultValue={prefilledMessage}
                                className="flex w-full rounded-md border border-black/10 bg-black/5 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="I need 50 units..."
                            />
                        </div>
                        <DialogFooter className="pt-4">
                            <Button type="submit" disabled={loading} className="w-full bg-primary text-black hover:bg-black hover:text-white font-bold uppercase tracking-widest">
                                {loading ? <Loader2 className="animate-spin size-4 mr-2" /> : "Send Request"}
                            </Button>
                        </DialogFooter>
                    </form>
                ) : (
                    <div className="py-8 text-center space-y-4">
                        <div className="size-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                            <Mail className="size-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold">Request Sent!</h3>
                            <p className="text-sm text-black/60">We will send the quotation to your email shortly.</p>
                        </div>
                        <Button onClick={() => setOpen(false)} variant="outline">Close</Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}

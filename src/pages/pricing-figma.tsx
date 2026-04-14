import { useEffect, useRef, useState } from "react";
import { CheckCircle, MinusCircle, PlusCircle } from "@untitledui/icons";
import { Header } from "@/components/marketing/header-navigation/header";
import { Avatar } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Toggle } from "@/components/base/toggle/toggle";
import { RatingStars } from "@/components/foundations/rating-stars";
import { UntitledLogo } from "@/components/foundations/logo/untitledui-logo";
import { useTheme } from "@/providers/theme-provider";
import { cx } from "@/utils/cx";

type Plan = {
    name: string;
    description: string;
    monthlyPrice: number;
    yearlyPrice: number;
    features: string[];
    highlighted?: boolean;
};

const plans: Plan[] = [
    {
        name: "Basic plan",
        description: "Our most popular plan.",
        monthlyPrice: 10,
        yearlyPrice: 8,
        highlighted: true,
        features: [
            "Access to basic features",
            "Basic reporting and analytics",
            "Up to 10 individual users",
            "20 GB individual data",
            "Basic chat and email support",
        ],
    },
    {
        name: "Business plan",
        description: "Growing teams up to 20 users.",
        monthlyPrice: 20,
        yearlyPrice: 16,
        features: [
            "200+ integrations",
            "Advanced reporting and analytics",
            "Up to 20 individual users",
            "40 GB individual data",
            "Priority chat and email support",
        ],
    },
    {
        name: "Enterprise plan",
        description: "Advanced features + unlimited users.",
        monthlyPrice: 40,
        yearlyPrice: 32,
        features: [
            "Unlimited users",
            "Unlimited individual data",
            "Personalized + priority service",
            "Custom reporting + analytics",
            "Dedicated success manager",
        ],
    },
];

const faqs = [
    {
        question: "Is there a free trial available?",
        answer: "Yes, you can try us for free for 30 days. If you want, we can also schedule a personalized onboarding call.",
    },
    { question: "Can I change my plan later?", answer: "Absolutely. You can upgrade or downgrade your plan at any time from your billing settings." },
    { question: "What is your cancellation policy?", answer: "You can cancel at any time. Your current subscription remains active until the billing period ends." },
    { question: "Can other info be added to an invoice?", answer: "Yes. You can add your tax details, company info, and custom billing notes to invoices." },
    { question: "How does billing work?", answer: "You can choose monthly or annual billing. Annual gives you a lower effective monthly price." },
    { question: "How do I change my account email?", answer: "Go to account settings and update your email under profile details." },
];

export const PricingFigmaPage = () => {
    const [isYearly, setIsYearly] = useState(false);
    const [openFaq, setOpenFaq] = useState(0);
    const [email, setEmail] = useState("");
    const { theme, setTheme } = useTheme();
    const previousThemeRef = useRef(theme);

    useEffect(() => {
        setTheme("light");

        return () => {
            setTheme(previousThemeRef.current);
        };
    }, [setTheme]);

    return (
        <div className="bg-primary text-primary">
            <Header isFloating className="sticky top-0 z-40 bg-primary/90 backdrop-blur-sm" />

            <section className="mx-auto max-w-container px-8 pt-24 pb-24 text-center">
                <p className="text-md font-semibold text-brand-secondary">Pricing</p>
                <h1 className="mt-3 text-display-lg font-semibold tracking-[-0.02em] text-primary">Simple, transparent pricing</h1>
                <p className="mx-auto mt-5 max-w-3xl text-xl text-tertiary">We believe Untitled should be accessible to all companies, no matter the size.</p>

                <div className="mx-auto mt-10 inline-flex items-center gap-3 rounded-xl border border-secondary bg-secondary px-4 py-1.5">
                    <span className={cx("text-md font-semibold", !isYearly ? "text-primary" : "text-quaternary")}>Monthly billing</span>
                    <Toggle size="md" isSelected={isYearly} onChange={setIsYearly} />
                    <span className={cx("text-md font-semibold", isYearly ? "text-primary" : "text-quaternary")}>Annual billing</span>
                </div>
            </section>

            <section className="mx-auto grid max-w-container gap-8 px-8 pb-24 lg:grid-cols-3">
                {plans.map((plan) => {
                    const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;

                    return (
                        <article key={plan.name} className="overflow-hidden rounded-2xl border border-secondary_alt bg-primary shadow-lg">
                            <div className="space-y-7 border-b border-secondary p-8">
                                <div className="flex items-start justify-between gap-4">
                                    <h2 className="text-lg font-semibold text-primary">{plan.name}</h2>
                                    {plan.highlighted && (
                                        <span className="rounded-full border border-brand bg-brand-secondary px-3 py-1 text-sm font-medium text-brand-secondary">
                                            Popular
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-end gap-1">
                                    <p className="text-display-xl font-semibold tracking-[-0.02em] text-primary">${price}</p>
                                    <p className="pb-2 text-md text-tertiary">per month</p>
                                </div>
                                <p className="text-md text-tertiary">{plan.description}</p>
                                <div className="space-y-3">
                                    <Button size="lg" className="w-full">
                                        Get started
                                    </Button>
                                    <Button color="secondary" size="lg" className="w-full">
                                        Chat to sales
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-4 px-8 pt-8 pb-10">
                                <p className="text-md font-semibold text-primary">FEATURES</p>
                                <ul className="space-y-4">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-3">
                                            <CheckCircle className="mt-0.5 size-5 text-fg-success-primary" />
                                            <span className="text-md text-tertiary">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </article>
                    );
                })}
            </section>

            <section className="mx-auto max-w-container px-8 pt-20 pb-10">
                <div className="mx-auto max-w-3xl text-center">
                    <h3 className="text-display-md font-semibold text-primary">Frequently asked questions</h3>
                    <p className="mt-4 text-xl text-tertiary">Everything you need to know about the product and billing.</p>
                </div>

                <div className="mx-auto mt-12 max-w-3xl divide-y divide-secondary border-y border-secondary">
                    {faqs.map((faq, index) => {
                        const isOpen = openFaq === index;
                        return (
                            <button
                                type="button"
                                key={faq.question}
                                onClick={() => setOpenFaq(isOpen ? -1 : index)}
                                className="w-full py-7 text-left"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-md font-semibold text-primary">{faq.question}</p>
                                        {isOpen && <p className="mt-2 text-md text-tertiary">{faq.answer}</p>}
                                    </div>
                                    {isOpen ? <MinusCircle className="size-5 text-fg-tertiary" /> : <PlusCircle className="size-5 text-fg-tertiary" />}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </section>

            <section className="mx-auto max-w-container px-8 pb-24">
                <div className="mx-auto mb-16 max-w-3xl rounded-2xl bg-secondary px-10 py-9 text-center">
                    <div className="mx-auto flex w-max items-center -space-x-2">
                        <Avatar size="md" initials="OR" />
                        <Avatar size="md" initials="LB" />
                        <Avatar size="md" initials="AM" />
                    </div>
                    <h4 className="mt-5 text-xl font-semibold text-primary">Still have questions?</h4>
                    <p className="mt-2 text-lg text-tertiary">Can’t find the answer you’re looking for? Please chat to our friendly team.</p>
                    <Button className="mt-6">Get in touch</Button>
                </div>

                <div className="mb-10 text-center">
                    <h3 className="text-display-md font-semibold text-primary">Wall of love</h3>
                    <p className="mt-3 text-lg text-tertiary">Hear first-hand from our incredible community of customers.</p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {["Great support and clean UI components.", "We shipped faster with these building blocks.", "Excellent design quality and DX."].map(
                        (quote, index) => (
                            <article key={quote} className="rounded-2xl border border-secondary bg-primary p-6">
                                <RatingStars rating={5} className="gap-1" />
                                <p className="mt-4 text-md text-primary">{quote}</p>
                                <div className="mt-6 flex items-center gap-3">
                                    <Avatar size="md" initials={`U${index + 1}`} />
                                    <div>
                                        <p className="text-sm font-semibold text-primary">Customer {index + 1}</p>
                                        <p className="text-sm text-tertiary">Product team</p>
                                    </div>
                                </div>
                            </article>
                        ),
                    )}
                </div>
            </section>

            <section className="mx-auto max-w-container px-8 pb-24">
                <div className="rounded-2xl bg-secondary px-16 py-12">
                    <h3 className="text-display-md font-semibold text-primary">Start your 30-day free trial</h3>
                    <p className="mt-4 text-xl text-tertiary">Join over 4,000+ startups already growing with Untitled.</p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Button color="secondary" size="lg">
                            Learn more
                        </Button>
                        <Button size="lg">Get started</Button>
                    </div>
                </div>
            </section>

            <footer className="bg-primary-solid">
                <div className="mx-auto max-w-container px-8 py-16">
                    <div className="grid gap-10 lg:grid-cols-3">
                        <div>
                            <UntitledLogo className="h-8 text-white" />
                            <p className="mt-4 max-w-sm text-md text-tertiary_on-brand">
                                Design amazing digital experiences that create more happy in the world.
                            </p>
                            <div className="mt-5 inline-flex items-center gap-3 rounded-full border border-secondary_alt bg-primary_alt px-3 py-1.5">
                                <div className="flex -space-x-1">
                                    <Avatar size="xs" initials="AC" />
                                    <Avatar size="xs" initials="RF" />
                                    <Avatar size="xs" initials="LP" />
                                </div>
                                <p className="text-xs font-medium text-secondary_on-brand">Join 2,000+ companies</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6 text-sm text-tertiary_on-brand">
                            <div className="space-y-2">
                                <p className="font-semibold text-primary_on-brand">Product</p>
                                <p>Overview</p>
                                <p>Features</p>
                                <p>Solutions</p>
                                <p>Tutorials</p>
                                <p>Pricing</p>
                            </div>
                            <div className="space-y-2">
                                <p className="font-semibold text-primary_on-brand">Resources</p>
                                <p>Blog</p>
                                <p>Newsletter</p>
                                <p>Help center</p>
                                <p>Support</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-primary_on-brand">Start growing with Untitled</p>
                            <div className="mt-3 flex gap-3">
                                <Input
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={setEmail}
                                    wrapperClassName="bg-primary text-primary_on-brand ring-secondary_alt"
                                    inputClassName="text-primary_on-brand placeholder:text-tertiary_on-brand"
                                />
                                <Button>Subscribe</Button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-secondary pt-8 text-sm text-quaternary_on-brand">
                        <p>© 2077 Untitled UI. All rights reserved.</p>
                        <div className="flex items-center gap-4">
                            <p>Terms</p>
                            <p>Privacy</p>
                            <p>Cookies</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

import { useState } from "react";
import {
    Award02,
    Calendar,
    CurrencyDollar,
    FilterLines,
    Heart,
    Home02,
    List,
    MarkerPin02,
    SearchLg,
    Share01,
    Star01,
    Wifi,
} from "@untitledui/icons";
import { HeaderNavigationBase } from "@/components/application/app-navigation/header-navigation";
import { BadgeWithIcon } from "@/components/base/badges/badges";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { Button } from "@/components/base/buttons/button";
import { InputBase } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { PaginationPageDefault } from "@/components/application/pagination/pagination";
import { RatingStars } from "@/components/foundations/rating-stars";

// ─── Nav items ───────────────────────────────────────────────────────────────

const navItems = [
    { label: "Home", href: "/" },
    { label: "Bookings", href: "/bookings" },
    { label: "Projects", href: "/projects" },
    { label: "Tasks", href: "/tasks" },
    { label: "Reporting", href: "/reporting" },
    { label: "Users", href: "/users" },
];

// ─── Types + mock data ───────────────────────────────────────────────────────

interface Listing {
    id: string;
    category: string;
    title: string;
    rating: number;
    reviews: number;
    location: string;
    beds: string;
    wifi: boolean;
    price: number;
    currency: string;
    image: string;
    rareFind?: boolean;
}

const listings: Listing[] = [
    {
        id: "l1",
        category: "Entire apartment rental in Collingwood",
        title: "A Stylish Apt, 5 min walk to Queen Victoria Market",
        rating: 4.9,
        reviews: 202,
        location: "Collingwood VIC",
        beds: "1 bed",
        wifi: true,
        price: 540,
        currency: "AUD",
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&h=300&q=80",
        rareFind: true,
    },
    {
        id: "l2",
        category: "Entire loft in central business district",
        title: "Designer NY style loft",
        rating: 4.8,
        reviews: 44,
        location: "Melbourne VIC",
        beds: "1 bed",
        wifi: true,
        price: 620,
        currency: "AUD",
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&h=300&q=80",
    },
    {
        id: "l3",
        category: "Entire rental unit in Carlton",
        title: "5 minute walk from University of Melbourne",
        rating: 4.7,
        reviews: 82,
        location: "Carlton VIC",
        beds: "1 bed",
        wifi: true,
        price: 490,
        currency: "AUD",
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=400&h=300&q=80",
    },
    {
        id: "l4",
        category: "Entire apartment rental in Collingwood",
        title: "Magnificent apartment next to public transport",
        rating: 4.8,
        reviews: 12,
        location: "Collingwood VIC",
        beds: "1 bed",
        wifi: true,
        price: 600,
        currency: "AUD",
        image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=400&h=300&q=80",
    },
];

const locationOptions = [
    { id: "melbourne", label: "Melbourne, AU", icon: MarkerPin02 },
    { id: "sydney", label: "Sydney, AU", icon: MarkerPin02 },
    { id: "brisbane", label: "Brisbane, AU", icon: MarkerPin02 },
    { id: "perth", label: "Perth, AU", icon: MarkerPin02 },
];

const priceOptions = [
    { id: "any", label: "Any price" },
    { id: "under-300", label: "Under $300" },
    { id: "300-600", label: "$300 – $600" },
    { id: "600-plus", label: "$600+" },
];

// Marker positions on the map (approximate to Figma design).
const mapMarkers: { left: string; top: string }[] = [
    { left: "calc(50% - 26px)", top: "calc(50% - 51px)" },
    { left: "calc(50% - 96px)", top: "calc(50% - 67px)" },
    { left: "calc(50% - 18px)", top: "calc(50% + 27px)" },
    { left: "calc(50% + 58px)", top: "calc(50% - 77px)" },
    { left: "calc(50% + 34px)", top: "calc(50% - 113px)" },
    { left: "calc(50% - 92px)", top: "calc(50% + 43px)" },
    { left: "calc(50% + 18px)", top: "calc(50% + 71px)" },
    { left: "calc(50% - 22px)", top: "calc(50% - 158px)" },
    { left: "calc(50% + 82px)", top: "calc(50% - 125px)" },
    { left: "calc(50% + 176px)", top: "calc(50% - 119px)" },
    { left: "calc(50% - 6px)", top: "calc(50% - 19px)" },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

const MapLocationMarker = () => (
    <span className="relative flex size-10 items-center justify-center">
        <span className="absolute inline-flex size-10 rounded-full bg-fg-brand-secondary opacity-10" />
        <span className="absolute inline-flex size-6 rounded-full bg-fg-brand-secondary opacity-20" />
        <span className="relative inline-flex size-2 rounded-full bg-fg-brand-secondary" />
    </span>
);

const MapPlaceholder = () => (
    <div className="relative h-[360px] w-full overflow-hidden rounded-xl border border-secondary bg-primary shadow-xs">
        {/* Styled map background */}
        <div
            className="absolute inset-0"
            style={{
                backgroundColor: "#e8eef3",
                backgroundImage: [
                    "linear-gradient(135deg, #c5dff0 0%, #d5e8f2 35%, #e5eef3 70%, #f0f4e8 100%)",
                    "radial-gradient(circle at 35% 55%, #a9d0e6 0%, transparent 20%)",
                    "radial-gradient(circle at 60% 70%, #bad8e8 0%, transparent 25%)",
                ].join(", "),
            }}
            aria-hidden="true"
        />

        {/* Subtle grid overlay to simulate roads */}
        <div
            className="absolute inset-0 opacity-40"
            style={{
                backgroundImage: [
                    "linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                    "linear-gradient(0deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                    "linear-gradient(45deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
                ].join(", "),
                backgroundSize: "80px 80px, 80px 80px, 120px 120px",
            }}
            aria-hidden="true"
        />

        {/* Map type button group (top-left) */}
        <div className="absolute top-2 left-2 flex h-[29px] overflow-hidden rounded-xs bg-white shadow-[0_1px_3px_0_rgba(0,0,0,0.2)]">
            <span className="flex items-center border-r border-black/10 px-3 text-[11px] font-medium text-black">Map</span>
            <span className="flex items-center px-3 text-[11px] text-black/60">Satellite</span>
        </div>

        {/* Google logo (bottom-left) */}
        <span className="absolute bottom-1 left-1.5 text-[10px] font-semibold text-black/60">Google</span>

        {/* Zoom controls (top-right) */}
        <div className="absolute top-2 right-2 flex w-7 flex-col overflow-hidden rounded-xs bg-white shadow-[0_1px_3px_0_rgba(0,0,0,0.2)]">
            <button type="button" aria-label="Zoom in" className="flex h-7 items-center justify-center border-b border-black/10 text-black/60">
                +
            </button>
            <button type="button" aria-label="Zoom out" className="flex h-[26px] items-center justify-center text-black/60">
                −
            </button>
        </div>

        {/* Pegman */}
        <div
            className="absolute top-[69px] right-2 size-7 rounded-xs bg-white shadow-[0_1px_3px_0_rgba(0,0,0,0.2)]"
            aria-hidden="true"
        />

        {/* Pin markers */}
        {mapMarkers.map((pos, i) => (
            <span
                key={i}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: pos.left, top: pos.top }}
            >
                <MapLocationMarker />
            </span>
        ))}
    </div>
);

const ListingCard = ({ listing }: { listing: Listing }) => (
    <article className="flex gap-5 rounded-2xl border border-secondary bg-primary p-4 shadow-xs">
        <div className="relative min-h-[144px] w-[200px] shrink-0 self-stretch overflow-hidden rounded-md border border-secondary_alt">
            <img src={listing.image} alt={listing.title} className="absolute inset-0 size-full object-cover" />
            {listing.rareFind && (
                <div className="absolute top-3 left-3">
                    <BadgeWithIcon size="sm" type="pill-color" color="brand" iconLeading={Award02}>
                        Rare find
                    </BadgeWithIcon>
                </div>
            )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-4">
            {/* Text + favorite button */}
            <div className="flex items-start gap-4">
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <p className="truncate text-sm font-semibold text-brand-secondary">{listing.category}</p>
                    <h3 className="text-lg font-semibold text-primary">{listing.title}</h3>
                </div>
                <Button size="xs" color="secondary" iconLeading={Heart} aria-label={`Save ${listing.title}`} />
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
                <RatingStars rating={listing.rating} />
                <div className="flex items-center gap-2 text-md">
                    <span className="font-medium text-primary">{listing.rating.toFixed(1)}</span>
                    <span className="text-tertiary">{listing.reviews} reviews</span>
                </div>
            </div>

            {/* Details row + price */}
            <div className="flex flex-wrap items-center justify-between gap-y-6">
                <div className="flex flex-wrap items-start gap-4">
                    <div className="flex items-center gap-2">
                        <MarkerPin02 className="size-5 text-fg-quaternary" aria-hidden="true" />
                        <span className="text-md font-medium text-tertiary">{listing.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Home02 className="size-5 text-fg-quaternary" aria-hidden="true" />
                        <span className="text-md font-medium text-tertiary">{listing.beds}</span>
                    </div>
                    {listing.wifi && (
                        <div className="flex items-center gap-2">
                            <Wifi className="size-5 text-fg-quaternary" aria-hidden="true" />
                            <span className="text-md font-medium text-tertiary">Wi-Fi</span>
                        </div>
                    )}
                </div>

                <div className="flex items-end gap-2">
                    <p className="text-xl font-semibold text-primary">${listing.price}</p>
                    <p className="pb-0.5 text-md text-tertiary">{listing.currency} total</p>
                </div>
            </div>
        </div>
    </article>
);

// ─── Page ────────────────────────────────────────────────────────────────────

export const BookingsPage = () => {
    const [sortBy, setSortBy] = useState<"date" | "price">("date");
    const [viewMode, setViewMode] = useState<"list" | "map">("list");
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <div className="flex min-h-screen flex-col bg-primary">
            <HeaderNavigationBase activeUrl="/bookings" items={navItems} />

            <main className="flex flex-1 flex-col gap-8 pt-12 pb-24">
                {/* ── Page header ── */}
                <section className="mx-auto w-full max-w-container px-8">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-5">
                            <div className="flex min-w-[320px] flex-1 flex-col gap-0.5">
                                <h1 className="text-xl font-semibold text-primary">232 stays in Melbourne</h1>
                                <p className="text-md text-tertiary">Book your next stay at one of our properties.</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Button size="sm" color="secondary" iconLeading={Share01}>
                                    Share
                                </Button>
                                <Button size="sm" color="primary" iconLeading={Star01}>
                                    Save search
                                </Button>
                            </div>
                        </div>
                        <div className="h-px w-full bg-border-secondary" />
                    </div>
                </section>

                {/* ── Filters + Map ── */}
                <section className="mx-auto flex w-full max-w-container flex-col gap-6 px-8">
                    <div className="flex flex-col gap-4">
                        {/* Row 1: location / date / price / more filters */}
                        <div className="flex flex-wrap items-start justify-between gap-3">
                            <div className="flex flex-wrap items-start gap-3">
                                <Select
                                    aria-label="Location"
                                    size="sm"
                                    defaultSelectedKey="melbourne"
                                    items={locationOptions}
                                    className="w-56"
                                >
                                    {(item) => (
                                        <Select.Item id={item.id} icon={item.icon}>
                                            {item.label}
                                        </Select.Item>
                                    )}
                                </Select>

                                <Button size="sm" color="secondary" iconLeading={Calendar}>
                                    Jan 8, 2027 – Jan 14, 2027
                                </Button>

                                <Select
                                    aria-label="Price"
                                    size="sm"
                                    placeholder="Any price"
                                    icon={CurrencyDollar}
                                    items={priceOptions}
                                    className="w-40"
                                >
                                    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                </Select>
                            </div>

                            <Button size="sm" color="secondary" iconLeading={FilterLines}>
                                More filters
                            </Button>
                        </div>

                        {/* Row 2: search + actions */}
                        <div className="flex items-start gap-3">
                            <InputBase
                                size="sm"
                                placeholder="Search"
                                icon={SearchLg}
                                shortcut
                                aria-label="Search stays"
                                wrapperClassName="flex-1"
                            />
                            <Button size="sm" color="secondary">
                                Clear
                            </Button>
                            <Button size="sm" color="primary">
                                Search
                            </Button>
                        </div>
                    </div>

                    <MapPlaceholder />
                </section>

                {/* ── Sort controls + Results ── */}
                <section className="mx-auto flex w-full max-w-container flex-col gap-6 px-8">
                    <div className="flex items-start justify-between">
                        <ButtonGroup
                            size="sm"
                            selectedKeys={[sortBy]}
                            onSelectionChange={(keys) => {
                                const [key] = [...keys];
                                if (key) setSortBy(key as "date" | "price");
                            }}
                        >
                            <ButtonGroupItem id="date">Sort by date</ButtonGroupItem>
                            <ButtonGroupItem id="price">Sort by price</ButtonGroupItem>
                        </ButtonGroup>

                        <ButtonGroup
                            size="sm"
                            selectedKeys={[viewMode]}
                            onSelectionChange={(keys) => {
                                const [key] = [...keys];
                                if (key) setViewMode(key as "list" | "map");
                            }}
                        >
                            <ButtonGroupItem id="list" iconLeading={List} aria-label="List view" />
                            <ButtonGroupItem id="map" iconLeading={MarkerPin02} aria-label="Map view" />
                        </ButtonGroup>
                    </div>

                    {/* Results list */}
                    <div className="flex flex-col gap-4">
                        {listings.map((l) => (
                            <ListingCard key={l.id} listing={l} />
                        ))}
                    </div>

                    <PaginationPageDefault
                        rounded
                        page={currentPage}
                        total={10}
                        onPageChange={setCurrentPage}
                    />
                </section>
            </main>
        </div>
    );
};

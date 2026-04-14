import { useState } from "react";
import type { Key } from "react-aria-components";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    AreaChart,
    Area,
} from "recharts";
import {
    BarChart02,
    Calendar,
    CheckSquare,
    CreditCard01,
    DotsVertical,
    DownloadCloud02,
    Edit01,
    File06,
    FolderClosed,
    HelpCircle,
    LayoutGrid01,
    Plus,
    SearchLg,
    Users01,
} from "@untitledui/icons";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { CreditCard } from "@/components/shared-assets/credit-card/credit-card";
import { FileUpload } from "@/components/application/file-upload/file-upload-base";
import { SidebarNavigationSectionsSubheadings } from "@/components/application/app-navigation/sidebar-navigation/sidebar-sections-subheadings";
import { Tab, TabList, TabPanel, Tabs } from "@/components/application/tabs/tabs";
import VisaIcon from "@/components/foundations/payment-icons/visa-icon";
import MastercardIcon from "@/components/foundations/payment-icons/mastercard-icon";
import { ChartTooltipContent } from "@/components/application/charts/charts-base";
import { cx } from "@/utils/cx";

// ─── Navigation config ─────────────────────────────────────────────────────

const navItems = [
    {
        label: "GENERAL",
        items: [
            { label: "Dashboard", href: "/dashboard", icon: LayoutGrid01 },
            { label: "Projects", href: "/projects", icon: FolderClosed },
            { label: "Documents", href: "/documents", icon: File06 },
            { label: "Calendar", href: "/calendar", icon: Calendar },
        ],
    },
    {
        label: "UNTITLED UI",
        items: [
            { label: "Reporting", href: "/reporting", icon: BarChart02 },
            { label: "Tasks", href: "/tasks", icon: CheckSquare, badge: "8" },
            { label: "Users", href: "/users", icon: Users01 },
        ],
    },
    {
        label: "YOUR CARDS",
        items: [{ label: "Your cards", href: "/your-cards", icon: CreditCard01 }],
    },
];

// ─── Chart data ─────────────────────────────────────────────────────────────

const balancesData = [
    { month: "Jan", value: 80 },
    { month: "Feb", value: 120 },
    { month: "Mar", value: 40 },
    { month: "Apr", value: 95 },
    { month: "May", value: 40 },
    { month: "Jun", value: 110 },
    { month: "Jul", value: 80 },
    { month: "Aug", value: 95 },
    { month: "Sep", value: 80 },
    { month: "Oct", value: 100 },
    { month: "Nov", value: 120 },
    { month: "Dec", value: 65 },
];

const balanceOverTimeData = [
    { month: "Jan", balance: 1200 },
    { month: "Feb", balance: 1150 },
    { month: "Mar", balance: 1250 },
    { month: "Apr", balance: 1180 },
    { month: "May", balance: 1220 },
    { month: "Jun", balance: 1200 },
    { month: "Jul", balance: 1240 },
    { month: "Aug", balance: 1280 },
    { month: "Sep", balance: 1350 },
    { month: "Oct", balance: 1380 },
    { month: "Nov", balance: 1420 },
    { month: "Dec", balance: 1440 },
];

// ─── Table data ──────────────────────────────────────────────────────────────

type Category = "subscriptions" | "dining" | "uncategorized" | "groceries";

interface Receipt {
    id: string;
    merchant: string;
    size: string;
    amount: string;
    category: Category | null;
    accountType: "debit" | "credit";
    accountEnds: string;
    paymentBrand: "visa" | "mastercard";
}

const receipts: Receipt[] = [
    { id: "1", merchant: "Spotify", size: "200 KB", amount: "$18.99", category: "subscriptions", accountType: "debit", accountEnds: "1234", paymentBrand: "visa" },
    { id: "2", merchant: "A Coffee", size: "220 KB", amount: "$4.50", category: "dining", accountType: "debit", accountEnds: "1234", paymentBrand: "visa" },
    { id: "3", merchant: "Rosso Antico", size: "192 KB", amount: "$88.00", category: null, accountType: "credit", accountEnds: "5678", paymentBrand: "mastercard" },
    { id: "4", merchant: "Figma", size: "216 KB", amount: "$15.00", category: "subscriptions", accountType: "debit", accountEnds: "1234", paymentBrand: "visa" },
    { id: "5", merchant: "TBF Bakery", size: "420 KB", amount: "$12.50", category: "dining", accountType: "debit", accountEnds: "1234", paymentBrand: "visa" },
    { id: "6", merchant: "Fresh F&V", size: "512 KB", amount: "$40.20", category: "groceries", accountType: "debit", accountEnds: "1234", paymentBrand: "visa" },
    { id: "7", merchant: "Webflow", size: "196 KB", amount: "$192.00", category: null, accountType: "credit", accountEnds: "5678", paymentBrand: "mastercard" },
];

// ─── Receipt file icon ───────────────────────────────────────────────────────

const ReceiptFileIcon = () => (
    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary ring-1 ring-secondary ring-inset">
        <File06 className="size-5 text-fg-quaternary" />
    </div>
);

// ─── Category badge ──────────────────────────────────────────────────────────

const CategoryBadge = ({ category }: { category: Category | null }) => {
    if (!category) {
        return <span className="text-sm text-tertiary">Uncategorized</span>;
    }

    const config: Record<Category, { label: string; color: "brand" | "error" | "success" | "warning" | "gray" | "sky" | "purple" | "pink" | "orange" | "indigo" | "blue" | "slate" }> = {
        subscriptions: { label: "Subscriptions", color: "brand" },
        dining: { label: "Dining", color: "pink" },
        groceries: { label: "Groceries", color: "blue" },
        uncategorized: { label: "Uncategorized", color: "gray" },
    };

    const { label, color } = config[category];
    return (
        <BadgeWithDot size="sm" type="pill-color" color={color}>
            {label}
        </BadgeWithDot>
    );
};

// ─── Custom bar chart shape ──────────────────────────────────────────────────

interface BarShapeProps {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
}

const RoundedBar = ({ x = 0, y = 0, width = 0, height = 0 }: BarShapeProps) => {
    if (height <= 0) return null;
    const radius = 3;
    return (
        <rect
            x={x}
            y={y}
            width={width}
            height={height}
            rx={radius}
            ry={radius}
            className="fill-brand-600"
        />
    );
};

// ─── Page ───────────────────────────────────────────────────────────────────

export const YourCardsPage = () => {
    const [activeTimeRange, setActiveTimeRange] = useState<Set<Key>>(new Set(["12months"]));
    const [activeBalanceRange, setActiveBalanceRange] = useState<Set<Key>>(new Set(["12months"]));

    return (
        <div className="flex h-dvh overflow-hidden bg-secondary">
            {/* Sidebar Navigation */}
            <SidebarNavigationSectionsSubheadings activeUrl="/your-cards" items={navItems} />

            {/* Main area */}
            <div className="flex min-w-0 flex-1 flex-col overflow-auto lg:py-1 lg:pr-1">
                <div className="flex min-h-full flex-col rounded-xl bg-primary">
                    {/* Page header */}
                    <div className="flex items-center gap-4 border-b border-secondary px-8 py-4">
                        <h1 className="flex-1 text-xl font-semibold text-primary">Your cards</h1>

                        <div className="flex w-64 items-center gap-2 rounded-lg border border-primary bg-primary px-3 py-2 shadow-xs">
                            <SearchLg className="size-4 shrink-0 text-fg-quaternary" />
                            <span className="flex-1 text-sm text-placeholder">Search</span>
                            <kbd className="flex rounded px-1 py-px font-body text-xs font-medium text-quaternary ring-1 ring-secondary ring-inset">⌘K</kbd>
                        </div>
                    </div>

                    {/* Content section */}
                    <div className="flex min-h-0 flex-1">
                        {/* Left sidebar panel */}
                        <div className="flex w-[348px] shrink-0 flex-col gap-8 overflow-y-auto px-8 py-8">
                            {/* Section header */}
                            <div>
                                <p className="text-md font-semibold text-primary">Overview</p>
                                <p className="mt-0.5 text-sm text-tertiary">Manage and track your card spending.</p>
                            </div>

                            {/* Credit cards stacked display */}
                            <div className="relative flex h-[260px] items-center justify-center overflow-hidden rounded-2xl bg-tertiary">
                                {/* Bottom card (gray-dark) */}
                                <div className="absolute" style={{ top: "80px", left: "50%", transform: "translateX(-50%) perspective(800px) rotateX(12deg) rotateY(-12deg) rotateZ(8deg)" }}>
                                    <CreditCard
                                        type="gray-dark"
                                        cardHolder="PHOENIX BAKER"
                                        cardExpiration="06/28"
                                        width={220}
                                    />
                                </div>
                                {/* Middle card (brand-dark) */}
                                <div className="absolute" style={{ top: "50px", left: "50%", transform: "translateX(-50%) perspective(800px) rotateX(12deg) rotateY(-12deg) rotateZ(8deg)" }}>
                                    <CreditCard
                                        type="brand-dark"
                                        cardHolder="OLIVIA RHYE"
                                        cardExpiration="06/28"
                                        width={220}
                                    />
                                </div>
                                {/* Top card (transparent) */}
                                <div className="absolute" style={{ top: "20px", left: "50%", transform: "translateX(-50%) perspective(800px) rotateX(12deg) rotateY(-12deg) rotateZ(8deg)" }}>
                                    <CreditCard
                                        type="transparent"
                                        cardHolder="LANA STEINER"
                                        cardExpiration="06/28"
                                        width={220}
                                    />
                                </div>

                                {/* Menu button */}
                                <ButtonUtility
                                    className="absolute top-3 right-3"
                                    size="xs"
                                    color="tertiary"
                                    icon={DotsVertical}
                                    tooltip="Options"
                                />
                            </div>

                            {/* Tabs: Overview, Budget, Spending, Rewards */}
                            <div className="border-b border-secondary">
                                <Tabs defaultSelectedKey="overview">
                                    <TabList type="underline" size="sm">
                                        <Tab id="overview">Overview</Tab>
                                        <Tab id="budget">Budget</Tab>
                                        <Tab id="spending">Spending</Tab>
                                        <Tab id="rewards">Rewards</Tab>
                                    </TabList>
                                    <TabPanel id="overview" />
                                    <TabPanel id="budget" />
                                    <TabPanel id="spending" />
                                    <TabPanel id="rewards" />
                                </Tabs>
                            </div>

                            {/* Stats */}
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-4">
                                    <span className="flex-1 text-sm font-medium text-tertiary">Current balance</span>
                                    <span className="text-display-xs font-semibold text-primary">$1,440.40</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="flex-1 text-sm font-medium text-tertiary">Current limit</span>
                                    <span className="text-display-xs font-semibold text-primary">$15,000.00</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="flex-1 text-sm font-medium text-tertiary">Budget this month</span>
                                    <span className="text-display-xs font-semibold text-primary">$2,400.00</span>
                                </div>
                            </div>

                            {/* Balances over time */}
                            <div className="flex flex-col gap-5">
                                <div className="flex flex-col gap-4">
                                    <p className="text-md font-semibold text-primary">Balances over time</p>
                                    <ButtonGroup
                                        size="sm"
                                        selectedKeys={activeTimeRange}
                                        onSelectionChange={(keys) => setActiveTimeRange(keys as Set<Key>)}
                                    >
                                        <ButtonGroupItem id="12months">12 months</ButtonGroupItem>
                                        <ButtonGroupItem id="30days">30 days</ButtonGroupItem>
                                        <ButtonGroupItem id="7days">7 days</ButtonGroupItem>
                                    </ButtonGroup>
                                </div>

                                {/* Bar chart */}
                                <div className="h-[200px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={balancesData} margin={{ top: 4, right: 0, left: 0, bottom: 0 }} barCategoryGap="30%">
                                            <CartesianGrid vertical={false} strokeDasharray="0" stroke="var(--color-border-secondary)" />
                                            <XAxis
                                                dataKey="month"
                                                tickLine={false}
                                                axisLine={false}
                                                tick={{ fontSize: 12, fill: "var(--color-text-tertiary)" }}
                                                interval={1}
                                            />
                                            <YAxis hide />
                                            <Tooltip
                                                cursor={{ fill: "var(--color-bg-primary_hover)" }}
                                                content={<ChartTooltipContent />}
                                            />
                                            <Bar dataKey="value" shape={<RoundedBar />} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>

                                {/* View full report */}
                                <div className="flex justify-end border-t border-secondary pt-4">
                                    <Button color="secondary" size="sm">View full report</Button>
                                </div>
                            </div>
                        </div>

                        {/* Vertical divider */}
                        <div className="w-px shrink-0 bg-border-secondary" />

                        {/* Main content panel */}
                        <div className="flex flex-1 flex-col gap-8 overflow-y-auto px-8 py-8">
                            {/* Balance over time section */}
                            <div className="flex flex-col gap-5">
                                <div className="flex items-start gap-4 border-b border-secondary pb-4">
                                    <div className="flex flex-1 flex-col gap-0.5">
                                        <p className="text-md font-semibold text-primary">Balance over time</p>
                                        <p className="text-sm text-tertiary">Compare spending over time.</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <ButtonGroup
                                            size="sm"
                                        selectedKeys={activeBalanceRange}
                                        onSelectionChange={(keys) => setActiveBalanceRange(keys as Set<Key>)}
                                        >
                                            <ButtonGroupItem id="12months">12 months</ButtonGroupItem>
                                            <ButtonGroupItem id="30days">30 days</ButtonGroupItem>
                                            <ButtonGroupItem id="7days">7 days</ButtonGroupItem>
                                        </ButtonGroup>
                                        <ButtonUtility size="sm" color="tertiary" icon={DotsVertical} tooltip="More options" />
                                    </div>
                                </div>

                                {/* Area/Line chart */}
                                <div className="h-[200px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={balanceOverTimeData} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
                                            <defs>
                                                <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="var(--color-brand-600)" stopOpacity={0.15} />
                                                    <stop offset="95%" stopColor="var(--color-brand-600)" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid vertical={false} strokeDasharray="0" stroke="var(--color-border-secondary)" />
                                            <XAxis
                                                dataKey="month"
                                                tickLine={false}
                                                axisLine={false}
                                                tick={{ fontSize: 12, fill: "var(--color-text-tertiary)" }}
                                            />
                                            <YAxis hide />
                                            <Tooltip content={<ChartTooltipContent />} />
                                            <Area
                                                type="monotone"
                                                dataKey="balance"
                                                stroke="var(--color-brand-600)"
                                                strokeWidth={2}
                                                fill="url(#balanceGradient)"
                                                dot={false}
                                                activeDot={{ r: 4, fill: "var(--color-brand-600)" }}
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Receipts section */}
                            <div className="flex flex-col gap-5">
                                {/* Section header */}
                                <div className="flex items-center gap-4 border-b border-secondary pb-4">
                                    <p className="flex-1 text-md font-semibold text-primary">Receipts</p>
                                    <div className="flex items-center gap-3">
                                        <Button color="secondary" size="sm" iconLeading={DownloadCloud02}>
                                            Export
                                        </Button>
                                        <Button color="primary" size="sm" iconLeading={Plus}>
                                            Add
                                        </Button>
                                    </div>
                                </div>

                                {/* File upload */}
                                <FileUpload.DropZone
                                    hint="SVG, PNG, JPG or GIF (max. 800×400px)"
                                    accept="image/*,.svg"
                                />

                                {/* Table */}
                                <div className="overflow-hidden rounded-xl ring-1 ring-secondary">
                                    {/* Table header */}
                                    <div className="grid grid-cols-[minmax(160px,1fr)_100px_160px_180px_44px] border-b border-secondary bg-secondary px-4">
                                        <div className="py-3 text-xs font-medium text-tertiary">Merchant</div>
                                        <div className="py-3 text-xs font-medium text-tertiary">Amount</div>
                                        <div className="py-3 text-xs font-medium text-tertiary">
                                            <span className="flex items-center gap-1">
                                                Category
                                                <HelpCircle className="size-3.5 text-fg-quaternary" />
                                            </span>
                                        </div>
                                        <div className="py-3 text-xs font-medium text-tertiary">
                                            <span className="flex items-center gap-1">
                                                Account
                                                <HelpCircle className="size-3.5 text-fg-quaternary" />
                                            </span>
                                        </div>
                                        <div className="py-3" />
                                    </div>

                                    {/* Table rows */}
                                    {receipts.map((receipt, index) => (
                                        <div
                                            key={receipt.id}
                                            className={cx(
                                                "grid grid-cols-[minmax(160px,1fr)_100px_160px_180px_44px] items-center px-4 transition duration-100 ease-linear hover:bg-primary_hover",
                                                index < receipts.length - 1 && "border-b border-secondary",
                                            )}
                                        >
                                            {/* Merchant */}
                                            <div className="flex items-center gap-3 py-4">
                                                <ReceiptFileIcon />
                                                <div className="min-w-0">
                                                    <p className="truncate text-sm font-medium text-secondary">{receipt.merchant}</p>
                                                    <p className="text-xs text-tertiary">{receipt.size}</p>
                                                </div>
                                            </div>

                                            {/* Amount */}
                                            <div className="py-4">
                                                <span className="text-sm text-secondary">{receipt.amount}</span>
                                            </div>

                                            {/* Category */}
                                            <div className="py-4">
                                                <CategoryBadge category={receipt.category} />
                                            </div>

                                            {/* Account */}
                                            <div className="flex items-center gap-2 py-4">
                                                <div className="flex size-8 shrink-0 items-center justify-center rounded">
                                                    {receipt.paymentBrand === "visa" ? (
                                                        <VisaIcon />
                                                    ) : (
                                                        <MastercardIcon />
                                                    )}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-sm font-medium text-secondary">
                                                        {receipt.accountType === "debit" ? "Debit card" : "Credit card"}
                                                    </p>
                                                    <p className="text-xs text-tertiary">Ends in {receipt.accountEnds}</p>
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex items-center justify-center py-4">
                                                <ButtonUtility size="xs" color="tertiary" icon={Edit01} tooltip="Edit" />
                                            </div>
                                        </div>
                                    ))}

                                    {/* Table footer */}
                                    <div className="flex items-center justify-end border-t border-secondary px-4 py-3">
                                        <Button color="secondary" size="sm">View full report</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

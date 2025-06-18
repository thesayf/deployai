import { AiFillBug } from "react-icons/ai";
import { BsFillCursorFill } from "react-icons/bs";
import {
  FiAlignLeft,
  FiAnchor,
  FiArrowRight,
  FiCheck,
  FiChevronDown,
  FiChevronRight,
  FiClock,
  FiEdit,
  FiEye,
  FiItalic,
} from "react-icons/fi";

const EmailAutomationComponent = () => {
  return (
    <div className="h-full w-full p-4">
      <div className="mb-6 flex items-center gap-1.5 text-sm">
        <span className="text-zinc-600">Customer Support</span>
        <FiChevronRight />
        <div className="flex items-center gap-1 rounded bg-green-100 px-1.5 py-0.5 text-green-900">
          <FiCheck />
          <span>AI Reply</span>
        </div>
      </div>
      <div className="-ml-1.5 mb-4 flex items-center gap-1.5">
        <div className="ml-1.5 size-8 rounded bg-indigo-200 shadow-inner flex items-center justify-center text-sm font-bold">
          AI
        </div>
        <div>
          <span className="block text-sm font-medium">Email Assistant</span>
          <span className="block text-xs text-zinc-600">Automated Response</span>
        </div>
      </div>
      <div className="mb-1 line-clamp-1 text-xl font-medium">
        Customer inquiry about pricing plans
      </div>
      <span className="line-clamp-3 text-sm leading-relaxed text-zinc-600">
        AI automatically categorized this as a pricing inquiry and drafted a personalized response with relevant plan details and next steps.
      </span>
      <div className="absolute bottom-0 left-0 right-0 flex items-center gap-1.5 bg-white/50 p-4 backdrop-blur">
        <span className="flex w-fit items-center gap-1 rounded bg-green-100 px-1.5 py-0.5 text-sm text-green-900">
          <FiCheck />
          <span>Sent</span>
        </span>
        <span className="flex w-fit items-center gap-1 rounded bg-blue-100 px-1.5 py-0.5 text-sm text-blue-900">
          <FiClock />
          <span>2 min</span>
        </span>
      </div>
    </div>
  );
};

const OrderProcessingComponent = () => {
  return (
    <div className="relative grid h-full w-full min-w-96 grid-cols-2 gap-2 p-4 pb-0 pr-0">
      <div className="relative z-0 h-full w-full rounded-t-xl bg-zinc-100 p-4">
        <div className="flex items-center justify-between">
          <span className="flex w-fit items-center gap-1 rounded bg-orange-100 px-1.5 py-0.5 text-sm text-orange-900">
            <FiClock />
            <span>Processing</span>
          </span>
          <FiChevronDown />
        </div>
        <div className="mt-4 space-y-2">
          <OrderTask title="Order #2847" status="Inventory Check" />
          <OrderTask title="Order #2848" status="Payment Verified" />
          <OrderTask title="Order #2849" status="Preparing Ship" />
        </div>
      </div>
      <div className="relative z-0 h-full w-full rounded-t-xl bg-zinc-100 p-4">
        <div className="flex items-center justify-between">
          <span className="flex w-fit items-center gap-1 rounded bg-green-100 px-1.5 py-0.5 text-sm text-green-900">
            <FiCheck />
            <span>Shipped</span>
          </span>
          <FiChevronDown />
        </div>
        <div className="mt-4 space-y-2">
          <OrderTask title="Order #2845" status="Delivered" />
        </div>
      </div>

      <ActiveOrderTask />
    </div>
  );
};

const OrderTask = ({ title, status }: { title: string; status: string }) => {
  return (
    <div className="w-full rounded-lg bg-white p-3 shadow">
      <div className="text-sm font-medium">{title}</div>
      <div className="text-xs text-zinc-600">{status}</div>
    </div>
  );
};

const ActiveOrderTask = () => {
  return (
    <div className="absolute left-1/2 top-1/2 z-10 w-64 -translate-x-1/2 -translate-y-1/2 rotate-3 rounded-lg border-2 border-indigo-600 bg-white p-4 shadow-xl shadow-indigo-600/20">
      <div className="mb-2 flex items-center gap-1.5 text-xs">
        <span className="text-zinc-600">Logistics Team</span>
        <FiChevronRight />
        <div className="flex items-center gap-1 rounded bg-indigo-100 px-1.5 py-0.5 text-indigo-900">
          <FiAnchor />
          <span>Priority</span>
        </div>
      </div>
      <span className="mb-0.5 block text-lg font-medium">
        Order #2846 - Express
      </span>
      <span className="block text-sm text-zinc-600">Auto-routed for same-day delivery</span>
    </div>
  );
};

const DataAnalyticsComponent = () => {
  return (
    <div className="relative h-full w-full p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Business Intelligence Dashboard</h3>
        <div className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs text-green-900">
          <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
          Live
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="rounded-lg bg-white p-3 border">
          <div className="text-xs text-zinc-500 mb-1">Revenue (Today)</div>
          <div className="text-2xl font-bold text-green-600">$47,892</div>
          <div className="text-xs text-green-600">↗ +23.5%</div>
        </div>
        <div className="rounded-lg bg-white p-3 border">
          <div className="text-xs text-zinc-500 mb-1">Orders</div>
          <div className="text-2xl font-bold text-blue-600">2,847</div>
          <div className="text-xs text-blue-600">↗ +18.2%</div>
        </div>
      </div>

      <div className="rounded-lg bg-white p-3 border">
        <div className="text-xs text-zinc-500 mb-2">Weekly Performance</div>
        <div className="flex items-end gap-1 h-16">
          <div className="w-4 bg-blue-500 h-8 rounded-t"></div>
          <div className="w-4 bg-blue-500 h-12 rounded-t"></div>
          <div className="w-4 bg-blue-500 h-6 rounded-t"></div>
          <div className="w-4 bg-blue-500 h-16 rounded-t"></div>
          <div className="w-4 bg-blue-500 h-10 rounded-t"></div>
          <div className="w-4 bg-green-500 h-14 rounded-t animate-pulse"></div>
          <div className="w-4 bg-orange-500 h-4 rounded-t opacity-50"></div>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 rounded bg-indigo-600 px-2 py-1 text-xs text-white">
        Auto-generated insights
      </div>
    </div>
  );
};

const ProcessOptimizationComponent = () => {
  return (
    <div className="relative h-full w-full p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Process Monitor</h3>
        <div className="flex items-center gap-1 rounded-full bg-orange-100 px-2 py-1 text-xs text-orange-900">
          <FiClock className="h-3 w-3" />
          Optimizing
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between rounded-lg bg-white p-3 border">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
            <span className="text-sm font-medium">Assembly Line A</span>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-green-600">98.7%</div>
            <div className="text-xs text-zinc-500">Efficiency</div>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-white p-3 border border-orange-300">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-orange-500 animate-pulse"></div>
            <span className="text-sm font-medium">Assembly Line B</span>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-orange-600">84.2%</div>
            <div className="text-xs text-zinc-500">Optimizing...</div>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-white p-3 border">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-blue-500"></div>
            <span className="text-sm font-medium">Quality Control</span>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-blue-600">99.1%</div>
            <div className="text-xs text-zinc-500">Pass Rate</div>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-green-50 border border-green-200 p-3">
        <div className="flex items-center gap-2 mb-2">
          <FiCheck className="h-4 w-4 text-green-600" />
          <span className="text-sm font-medium text-green-800">AI Recommendation Applied</span>
        </div>
        <div className="text-xs text-green-700">
          Cycle time reduced: 47→38 min (-19%)
          <br />
          Projected savings: $2.4M annually
        </div>
      </div>
    </div>
  );
};

export const data = [
  {
    id: 1,
    title: "Email Automation",
    Component: EmailAutomationComponent,
    cardTitle: "AI-Powered Email Management",
    cardSubtitle:
      "Automatically respond to customer inquiries, categorize support tickets, and route emails to the right team. Cut response time by 87% like our SaaS clients.",
  },
  {
    id: 2,
    title: "Order Processing",
    Component: OrderProcessingComponent,
    cardTitle: "Automated Order Workflows",
    cardSubtitle:
      "Transform manual order processing into smart automation. Track orders, manage inventory, and process shipments without human intervention.",
  },
  {
    id: 3,
    title: "Data Analytics",
    Component: DataAnalyticsComponent,
    cardTitle: "Real-Time Business Intelligence",
    cardSubtitle:
      "Turn your data into actionable insights with custom dashboards and automated reporting. See exactly what's driving your business growth.",
  },
  {
    id: 4,
    title: "Process Optimization",
    Component: ProcessOptimizationComponent,
    cardTitle: "Workflow Automation",
    cardSubtitle:
      "Eliminate bottlenecks and reduce errors with custom AI tools. Like our manufacturing client who saved $2.4M annually through process automation.",
  },
];

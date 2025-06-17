// src/pages/Home/AdminDashboard.jsx
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Home } from "lucide-react";
import { useState } from "react";
import person1 from "../../assets/Dashboard/person1.svg";
import person2 from "../../assets/Dashboard/person2.svg";
import person3 from "../../assets/Dashboard/person3.svg";
import map from "../../assets/Dashboard/map2.png";
/* ——— dummy chart data ——— */
const lineData = [
  { month: "Jan", apartments: 3500, villas: 2100 },
  { month: "Feb", apartments: 3800, villas: 2300 },
  { month: "Mar", apartments: 4000, villas: 2450 },
  { month: "Apr", apartments: 4200, villas: 2600 },
  { month: "May", apartments: 4500, villas: 2750 },
  { month: "Jun", apartments: 4700, villas: 2900 },
  { month: "Jul", apartments: 4950, villas: 3080 },
  { month: "Aug", apartments: 5050, villas: 3150 },
  { month: "Sep", apartments: 5200, villas: 3300 },
  { month: "Oct", apartments: 5350, villas: 3400 },
];

const pieData = [
  { name: "Buyer", value: 62, fill: "#b655e3" },
  { name: "Broker", value: 38, fill: "#feb066" },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-white pb-16 font-sans">
      {/* heading */}
      <h1 className="text-center text-lg font-medium mt-4 mb-6">
        Welcome to
        <span className="font-semibold"> KeyFinder Property Admin</span>
      </h1>

      <div className="container mx-auto px-4 space-y-6">
        {/* progress banner */}
        <section className="bg-[#001F54] rounded-xl text-white p-6 flex items-center gap-6 shadow">
          <Home className="w-12 h-12" />
          <div className="flex-grow">
            <p className="text-xs mb-1 text-gray-200">
              7 more to break last month record
            </p>
            <div className="w-full h-3 bg-gray-300 rounded">
              <div
                className="h-full bg-[#DBCD84] rounded"
                style={{ width: "85%" }}
              />
            </div>
          </div>
          <span className="text-2xl font-bold">450</span>
        </section>

        {/* stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <StatCard title="Apartments for Sale" value={71} color="#3c4abb" />
          <StatCard title="215 Villas for Sale" value={90} color="#3bd254" />
        </div>

        {/* overview & customer review */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <OverviewCard className="lg:col-span-2" />
          <CustomerReviewCard />
        </div>

        {/* pie + viewed + recent property */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <PieCard />
          <ViewedCard />
          <RecentPropertyCard />
        </div>

        {/* map section */}
        <MapCard />
      </div>
    </div>
  );
}

/* ========================================================================
 * Sub-components
 * ===================================================================== */
function StatCard({ title, value, color }) {
  return (
    <div className="bg-[#001F54] text-white p-6 rounded-xl flex items-center justify-between shadow">
      <h3 className="text-sm font-medium max-w-[60%]">{title}</h3>
      <div className="w-16 h-16">
        <CircularProgressbar
          value={value}
          text={`${value}%`}
          strokeWidth={10}
          styles={buildStyles({
            pathColor: color,
            textColor: "#fff",
            trailColor: "#0f2c5a",
            textSize: "28px",
          })}
        />
      </div>
    </div>
  );
}

function OverviewCard({ className = "" }) {
  return (
    <div
      className={`bg-[#001F54] rounded-xl p-4 text-white shadow ${className}`}
    >
      <Header title="Over View" />

      {/* edit/delete */}
      {/* <div className="flex flex-col items-end gap-2 mb-4">
        <button className="w-28 text-xs bg-white text-[#001F54] py-2 rounded text-center">
          Edit
        </button>
        <button className="w-28 text-xs bg-white text-[#001F54] py-2 rounded text-center">
          Delete
        </button>
      </div> */}

      {/* manual legend */}
      <div className="flex items-center gap-6 mb-2">
        <div className="flex items-center gap-1">
          <span
            className="w-3 h-3 inline-block rounded-sm"
            style={{ backgroundColor: "#3ca4eb" }}
          />
          <span className="text-xs">Total Sales for Apartments</span>
        </div>
        <div className="flex items-center gap-1">
          <span
            className="w-3 h-3 inline-block rounded-sm"
            style={{ backgroundColor: "#9cff39" }}
          />
          <span className="text-xs">Total Sales for Villas</span>
        </div>
      </div>

      <div className="h-64 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={lineData}
            margin={{ top: 10, right: 20, bottom: 5, left: 0 }}
          >
            <CartesianGrid stroke="#0f2c5a" strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip
              contentStyle={{
                background: "#001F54",
                border: "none",
                color: "#fff",
              }}
            />
            <Line
              type="monotone"
              dataKey="apartments"
              name="Apartments"
              stroke="#3ca4eb"
              strokeWidth={3}
            />
            <Line
              type="monotone"
              dataKey="villas"
              name="Villas"
              stroke="#9cff39"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function CustomerReviewCard() {
  const reviews = [
    {
      name: "Ahmed Mohamed",
      text: "Friendly service at KeyFinder you guys deserved a big thank you …",
      avatar: person1,
    },
    {
      name: "Mohamed Abdelmoniem",
      text: "Best service you will find at KeyFinder you guys are really doing a great job …",
      avatar: person2,
    },
    {
      name: "Youssef Kamal",
      text: "This Website is the best!!!!! It really helped me finding a home of Borg El-Arab …",
      avatar: person3,
    },
  ];

  return (
    <div className="bg-[#001F54] rounded-xl p-4 text-white shadow flex flex-col">
      <Header
        title="Recent Appointments"
        containerBg="bg-[#494949]"
        dotBg="bg-white"
      />

      {/* no max-h, no overflow: now all reviews display */}
      <div className="space-y-4 pr-2 mt-6">
        {reviews.map((r) => (
          <div
            key={r.name}
            className="flex items-center gap-4 p-4 border border-[#001F54] bg-white rounded"
          >
            {/* ↑ bump gap so text isn’t jammed on the image */}
            <img
              src={r.avatar}
              alt={r.name}
              className="w-20 h-20 object-cover rounded flex-shrink-0 "
            />
            <div className="flex-1">
              <p className="text-sm font-bold text-[#001F54] mb-2">{r.name}</p>
              <p className="text-xs font-semibold leading-relaxed text-[#001F54] break-words">
                {r.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-4 w-full bg-white text-[#001F54] border border-[#001F54] text-xs font-semibold py-3 rounded-xl">
        See More Appointments
      </button>
    </div>
  );
}

function PieCard() {
  // for converting degrees to radians
  const RADIAN = Math.PI / 180;

  // custom label renderer: positions label at mid‐radius of each slice
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={12}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="bg-[#001F54] rounded-xl p-4 text-white shadow flex flex-col items-center justify-center">
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            innerRadius={30}
            outerRadius={60}
            paddingAngle={3}
            labelLine={false}
            label={renderCustomizedLabel}
          >
            {pieData.map((entry, idx) => (
              <Cell key={idx} fill={entry.fill} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className="w-full flex flex-col items-start gap-4 text-sm mt-4">
        {pieData.map((d) => (
          <div key={d.name} className="flex items-center gap-3">
            <span
              className="w-6 h-3 inline-block rounded-sm"
              style={{ backgroundColor: d.fill }}
            />
            <span className="font-bold">{d.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ViewedCard() {
  // static numbers – adjust these & the widths as needed
  const viewed = 600;
  const scheduled = 369;

  return (
    <div className="bg-[#001F54] rounded-xl p-4 text-white shadow flex flex-col gap-6">
      {/* Property Viewed */}
      <div>
        <p className="text-sm mb-2">
          Property Viewed:{" "}
          <span className="font-bold text-lg">{viewed} unit</span>
        </p>
        <div className="w-full h-3 bg-white rounded-full overflow-hidden">
          {/* fill width = 75% (600 / 800 goal for example) */}
          <div className="h-full bg-[#DBCD84]" style={{ width: "75%" }} />
        </div>
      </div>

      {/* Property Scheduled */}
      <div>
        <p className="text-sm mb-2">
          Property Scheduled:{" "}
          <span className="font-bold text-lg">{scheduled} property</span>
        </p>
        <div className="w-full h-3 bg-white rounded-full overflow-hidden">
          {/* fill width = 62% (369 / 600 as example) */}
          <div className="h-full bg-[#DBCD84]" style={{ width: "62%" }} />
        </div>
      </div>
    </div>
  );
}

const dummyProperties = [
  {
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=60",
    type: "Villa",
    area: "450 m²",
    bedrooms: 5,
    bathrooms: 4,
    at: "Dubai Hills",
    location: "Dubai, UAE",
    price: "$1.2M",
  },
  {
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=400&q=60",
    type: "Apartment",
    area: "120 m²",
    bedrooms: 2,
    bathrooms: 2,
    at: "Downtown",
    location: "Abu Dhabi, UAE",
    price: "$350K",
  },

  {
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=400&q=60",
    type: "Townhouse",
    area: "300 m²",
    bedrooms: 3,
    bathrooms: 3,
    at: "Palm Jumeirah",
    location: "Dubai, UAE",
    price: "$800K",
  },
];

function RecentPropertyCard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const property = dummyProperties[currentIndex];

  const prevCard = () =>
    setCurrentIndex(
      (idx) => (idx - 1 + dummyProperties.length) % dummyProperties.length
    );
  const nextCard = () =>
    setCurrentIndex((idx) => (idx + 1) % dummyProperties.length);

  // prepare label/value pairs for mapping
  const details = [
    ["Type:", property.type],
    ["Area:", property.area],
    ["Bedrooms:", property.bedrooms],
    ["Bathrooms:", property.bathrooms],
    ["At:", property.at],
    ["Location:", property.location],
    ["Price:", property.price],
  ];

  return (
    <div className="bg-[#001F54] rounded-xl p-4 text-white shadow flex flex-col">
      <Header title="Recent Property" />

      <div className="flex-1 flex flex-col items-center justify-center gap-2 text-xs">
        <img
          src={property.image}
          alt={`Property ${currentIndex + 1}`}
          className="w-60 h-30 object-cover rounded"
        />

        <div className="w-full grid grid-cols-[auto_1fr] gap-1 leading-5">
          {details.map(([label, value]) => (
            <React.Fragment key={label}>
              <span className="font-medium">{label}</span>
              <span>{value}</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-2">
        <button
          onClick={prevCard}
          className="w-6 h-6 rounded-full border border-white flex items-center justify-center text-xs"
        >
          ←
        </button>
        <button
          onClick={nextCard}
          className="w-6 h-6 rounded-full border border-white flex items-center justify-center text-xs"
        >
          →
        </button>
      </div>
    </div>
  );
}

function MapCard() {
  // your data
  const locations = [
    { label: "Alex West", value: 115 },
    { label: "Smouha", value: 273 },
    { label: "Borg Al-Arab", value: 120 },
    { label: "Al-Alamien", value: 200 },
  ];

  // find the max so we can compute relative widths
  const maxValue = Math.max(...locations.map((l) => l.value));

  return (
    <div className="bg-[#001F54] rounded-xl p-4 text-white shadow max-w-[990px]">
      <Header title="Properties Map Location" />

      <div className="flex gap-6 mt-4 items-start">
        {/* ─── left: labels + bars ─── */}
        <div className="flex flex-col gap-4 w-60  ">
          {locations.map((loc) => {
            const percent = Math.round((loc.value / maxValue) * 100);
            return (
              <div key={loc.label}>
                <p className="text-lg">
                  {loc.label}:{" "}
                  <span className="font-semibold">{loc.value} Unit</span>
                </p>

                <div className="w-full h-2 bg-white rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#DBCD84]"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* ─── right: world map ─── */}
        <img src={map} alt="world map" className="w-1/2 h-80  " />
      </div>
    </div>
  );
}

function Header({ title, containerBg = "bg-white", dotBg = "bg-[#001F54]" }) {
  return (
    <div className="flex items-center justify-between mb-2">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div
        className={`${containerBg} rounded px-2 py-1 flex items-center gap-1`}
      >
        <span className={`w-2 h-2 ${dotBg} rounded-full`} />
        <span className={`w-2 h-2 ${dotBg} rounded-full`} />
        <span className={`w-2 h-2 ${dotBg} rounded-full`} />
      </div>
    </div>
  );
}

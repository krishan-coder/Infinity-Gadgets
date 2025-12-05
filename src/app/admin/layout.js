"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";


const Navbar = () => {
  const pathname = usePathname(); // get current route

  const links = [
    { href: "/admin/add-product", label: "Add Product" },
    { href: "/admin/orders", label: "Check Orders" },
    { href: "/admin/stock", label: "Stock" },
  ];

  return (
    <nav className="position-fixed bg-gray-800 text-white p-4 rounded-md shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold font-inter">Admin Dashboard</h1>
        <div className="space-x-4 flex">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-3 py-2 rounded-lg transition-all duration-200 ease-in-out font-inter ${
                pathname === href ? "bg-indigo-600" : "hover:bg-gray-700"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="p-6">{children}</main>
    </div>
  );
}

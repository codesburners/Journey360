import React from 'react';
import { LayoutDashboard, Map, Link, Shield, Bookmark, User, Compass } from 'lucide-react';
import { auth } from '../../services/firebase';

const Sidebar = () => {
    const user = auth.currentUser;
    const email = user?.email || 'Guest';
    const initials = email.slice(0, 2).toUpperCase();

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', active: true },
        { icon: Map, label: 'My Trips', active: false },
        { icon: Shield, label: 'Safety Alerts', active: false },
        { icon: Bookmark, label: 'Saved Places', active: false },
        { icon: User, label: 'Profile', active: false },
    ];

    return (
        <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0">
            {/* Logo Area */}
            <div className="p-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                    <Compass size={20} />
                </div>
                <div>
                    <h1 className="font-bold text-gray-900 text-lg leading-tight">Journey360</h1>
                    <p className="text-xs text-gray-500 font-medium">Premium Travel AI</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-4 space-y-1">
                {navItems.map((item) => (
                    <a
                        key={item.label}
                        href="#"
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${item.active
                            ? 'bg-blue-50 text-blue-600 font-semibold'
                            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                    >
                        <item.icon
                            size={20}
                            className={`${item.active ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
                                }`}
                        />
                        <span>{item.label}</span>
                    </a>
                ))}
            </nav>

            {/* User/Account Section (Optional - can be at bottom or top right) */}
            <div className="p-4 border-t border-gray-100">
                <div className="flex items-center gap-3 px-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
                        {initials}
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium text-gray-900 truncate" title={email}>{email}</p>
                        <p className="text-xs text-gray-500">Free Plan</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;

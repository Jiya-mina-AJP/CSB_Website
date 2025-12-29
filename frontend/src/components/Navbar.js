import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Coffee, Info, Phone, ShoppingCart, User, DoorOpen, LogOut } from 'lucide-react';
import supabase from '../config/supabase';
import { MenuBar } from './MenuBar';
import './Navbar.css';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("Home");
  const { getCartCount } = useCart();

  // Calculate cart count safely
  const cartCount = getCartCount ? getCartCount() : 0;

  useEffect(() => {
    checkUser();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) checkAdmin(session.user.id);
      else setIsAdmin(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  // Update active item based on path
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setActiveItem("Home");
    else if (path.includes('/menu')) setActiveItem("Menu");
    else if (path.includes('/about')) setActiveItem("About");
    else if (path.includes('/contact')) setActiveItem("Contact");
    else if (path.includes('/cart')) setActiveItem("Cart");
    else if (path.includes('/admin')) setActiveItem("Dashboard");
    else if (path.includes('/login') || path.includes('/signup')) setActiveItem("Login");
  }, [location]);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    if (user) checkAdmin(user.id);
  };

  const checkAdmin = async (userId) => {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();
    if (profile?.role === 'admin') setIsAdmin(true);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  // Left Menu Items (Navigation)
  const leftItems = [
    { icon: Home, label: "Home", href: "/", gradient: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 100%)", iconColor: "text-blue-500" },
    { icon: Coffee, label: "Menu", href: "/menu", gradient: "radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 100%)", iconColor: "text-orange-500" },
    { icon: Info, label: "About", href: "/about", gradient: "radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 100%)", iconColor: "text-purple-500" },
    { icon: Phone, label: "Contact", href: "/contact", gradient: "radial-gradient(circle, rgba(34,197,94,0.15) 0%, transparent 100%)", iconColor: "text-green-500" },
  ];

  // Right Menu Items (User/Cart)
  const rightItems = [
    {
      icon: ShoppingCart,
      label: `Cart${cartCount > 0 ? ` (${cartCount})` : ''}`,
      href: "/cart",
      gradient: "radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 100%)",
      iconColor: "text-pink-500",
      badge: cartCount > 0 ? cartCount : null
    },
  ];

  if (user) {
    if (isAdmin) {
      rightItems.push({ icon: DoorOpen, label: "Admin Portal", href: "/admin", gradient: "radial-gradient(circle, rgba(239,68,68,0.15) 0%, transparent 100%)", iconColor: "text-red-500" });
    }
    // Logout is a special case, handled in click handler, but lets add item for it
    rightItems.push({ icon: LogOut, label: "Logout", href: "#logout", gradient: "radial-gradient(circle, rgba(107,114,128,0.15) 0%, transparent 100%)", iconColor: "text-gray-500" });
  } else {
    rightItems.push({ icon: User, label: "Login", href: "/login", gradient: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 100%)", iconColor: "text-indigo-500" });
  }

  const menuItems = [...leftItems, ...rightItems];

  const handleItemClick = (item) => {
    if (item.label === "Logout") {
      handleLogout();
    } else {
      navigate(item.href);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <MenuBar
        items={menuItems}
        activeItem={activeItem}
        onItemClick={handleItemClick}
      />
    </div>
  );
};

export default Navbar;

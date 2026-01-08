import React, { useState, useEffect } from 'react';
import MealCard from '../components/MealCard';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Bell, ShoppingBag, Filter, Coffee, Utensils, Carrot, Beef, Pizza } from 'lucide-react';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [activeCategory, setActiveCategory] = useState('All');
    const [locationAddress, setLocationAddress] = useState('Home');
    const [isLoadingLocation, setIsLoadingLocation] = useState(false);

    const getLocation = () => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
            return;
        }

        setIsLoadingLocation(true);
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            try {
                // Free Reverse Geocoding via OpenStreetMap (Nominatim)
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                const data = await response.json();

                if (data && data.address) {
                    const suburb = data.address.suburb || data.address.neighbourhood || data.address.city_district;
                    const city = data.address.city || data.address.town || data.address.village;

                    if (suburb && city) {
                        setLocationAddress(`${suburb}, ${city}`);
                    } else if (city) {
                        setLocationAddress(city);
                    } else {
                        setLocationAddress("Current Location");
                    }
                } else {
                    setLocationAddress(`${latitude.toFixed(2)}, ${longitude.toFixed(2)}`);
                }
            } catch (error) {
                console.error("Error fetching address:", error);
                setLocationAddress("Current Location");
            } finally {
                setIsLoadingLocation(false);
            }
        }, (error) => {
            let errorMessage = 'Unable to retrieve your location';
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage = "Location permission denied. Please allow access in browser settings.";
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage = "Location information is unavailable.";
                    break;
                case error.TIMEOUT:
                    errorMessage = "The request to get user location timed out.";
                    break;
                default:
                    errorMessage = "An unknown error occurred.";
            }
            alert(errorMessage);
            setIsLoadingLocation(false);
        });
    };

    // Circular Categories with Icons
    // "Bulk, Diet, Weight Loss, Normal"
    const categories = [
        { name: 'Weight Loss', icon: <Carrot size={24} /> },
        { name: 'Bulk / Muscle', icon: <Beef size={24} /> },
        { name: 'Balanced', icon: <Utensils size={24} /> },
        { name: 'Keto / Low Carb', icon: <Filter size={24} /> },
        { name: 'Breakfast', icon: <Coffee size={24} /> },
    ];

    const meals = [
        { title: 'Grilled Salmon & Asparagus', calories: 450, macros: { p: 45, c: 5, f: 20 }, time: 25, price: 15.50 },
        { title: 'Quinoa Power Bowl', calories: 380, macros: { p: 15, c: 45, f: 12 }, time: 15, price: 11.00 },
        { title: 'Lean Beef Stir Fry', calories: 550, macros: { p: 55, c: 30, f: 15 }, time: 30, price: 16.50 },
        { title: 'Chicken Avocado Salad', calories: 420, macros: { p: 40, c: 12, f: 22 }, time: 20, price: 12.00 },
        { title: 'Sweet Potato Bowl', calories: 480, macros: { p: 18, c: 60, f: 10 }, time: 25, price: 10.50 },
        { title: 'Steak & Broccoli Box', calories: 600, macros: { p: 60, c: 10, f: 30 }, time: 35, price: 18.00 },
    ];

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) setUser(user);
    };

    return (
        <div className="app-layout" style={{ background: 'var(--color-bg-main)', minHeight: '100vh', padding: '0 0 100px 0' }}>

            {/* Top Navigation / Header */}
            <div className="nav-bar" style={{ background: '#FFFFFF', padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: 'none', height: 'auto', paddingTop: '40px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }} onClick={getLocation}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Delivering To</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 'bold', color: 'var(--color-text-main)' }}>
                        <MapPin size={16} className={isLoadingLocation ? "animate-pulse" : "text-primary"} style={{ color: 'var(--color-primary)' }} />
                        <span>{isLoadingLocation ? 'Locating...' : locationAddress}</span>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <div style={{ position: 'relative' }}>
                        <Bell size={24} color="#374151" />
                        <span style={{ position: 'absolute', top: -2, right: 0, width: '10px', height: '10px', background: 'red', borderRadius: '50%', border: '2px solid white' }}></span>
                    </div>
                    <ShoppingBag size={24} color="#374151" />
                </div>
            </div>

            {/* Search Bar */}
            <div className="container" style={{ marginTop: '1.5rem', display: 'flex', gap: '10px', alignItems: 'center' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                    <Search size={20} color="gray" style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                        type="text"
                        className="form-input"
                        placeholder="Search for bulk, diet, etc..."
                        style={{ paddingLeft: '3rem', background: '#F3F4F6', border: 'none' }}
                    />
                </div>
                <button style={{ padding: '10px', background: 'var(--color-primary)', borderRadius: '12px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Filter size={20} />
                </button>
            </div>

            {/* Scrolling Banner */}
            <div className="container" style={{ marginTop: '2rem' }}>
                <div style={{
                    background: '#1F2937',
                    borderRadius: '20px',
                    padding: '2rem',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{ zIndex: 1 }}>
                        <span style={{
                            background: 'var(--color-primary)',
                            color: 'white',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '0.7rem',
                            fontWeight: 'bold',
                            marginBottom: '0.5rem',
                            display: 'inline-block'
                        }}>SUBSCRIPTION</span>
                        <h2 style={{ fontSize: '1.8rem', lineHeight: '1.2' }}>Daily Delivery<br /><span style={{ fontSize: '1rem', fontWeight: 'normal', opacity: 0.8 }}>Just like your newspaper!</span></h2>
                        <button onClick={() => navigate('/subscription')} style={{
                            marginTop: '1rem',
                            background: 'white',
                            color: '#1F2937',
                            padding: '0.5rem 1.5rem',
                            borderRadius: '20px',
                            fontSize: '0.9rem',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}>View Plans</button>
                    </div>
                    {/* Abstract overlapping circle for style */}
                    <div style={{ position: 'absolute', right: '-20px', bottom: '-20px', width: '150px', height: '150px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}></div>
                </div>
            </div>

            {/* Categories Rail - Centered */}
            <div className="container">
                <div className="category-scroll" style={{ marginTop: '1rem', justifyContent: 'center' }}>
                    {categories.map((cat, index) => (
                        <button
                            key={index}
                            className={`category-pill ${activeCategory === cat.name ? 'active' : ''}`}
                            onClick={() => setActiveCategory(cat.name)}
                        >
                            <div className="category-icon-wrapper">
                                {cat.icon}
                            </div>
                            <span>{cat.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Kitchen Near You / Meals */}
            <section className="container" style={{ marginTop: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', padding: '0 20px' }}>
                    <h3>Our Nutritious Menu</h3>
                    <span style={{ color: 'var(--color-primary)', fontSize: '0.9rem', cursor: 'pointer' }}>Filter</span>
                </div>

                <div className="meal-grid">
                    {meals.map((meal, index) => (
                        <MealCard key={index} {...meal} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Dashboard;

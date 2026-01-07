import React, { useState, useEffect } from 'react';
import MealCard from '../components/MealCard';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const categories = ['All', 'Keto', 'Vegan', 'High Protein', 'Paleo', 'Gluten Free', 'Low Carb'];

    const meals = [
        { title: 'Grilled Salmon with Asparagus', calories: 450, macros: { p: 35, c: 10, f: 20 }, time: 25 },
        { title: 'Quinoa Power Bowl', calories: 380, macros: { p: 15, c: 45, f: 12 }, time: 15 },
        { title: 'Chicken Avocado Salad', calories: 420, macros: { p: 40, c: 12, f: 22 }, time: 20 },
        { title: 'Keto Beef Stir Fry', calories: 550, macros: { p: 30, c: 8, f: 35 }, time: 30 },
        { title: 'Berry Protein Smoothie', calories: 250, macros: { p: 25, c: 20, f: 5 }, time: 5 },
        { title: 'Zucchini Noodle Pasta', calories: 310, macros: { p: 12, c: 15, f: 18 }, time: 25 },
    ];

    useEffect(() => {
        getUser();
        getTasks();
    }, []);

    const getUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            navigate('/login');
            return;
        }
        setUser(user);
    };

    const getTasks = async () => {
        const { data, error } = await supabase
            .from('tasks')
            .select('*')
            .order('inserted_at', { ascending: false });

        if (!error) setTasks(data || []);
    };

    const addTask = async (e) => {
        e.preventDefault();
        if (!newTask.trim()) return;

        const { data, error } = await supabase
            .from('tasks')
            .insert([{ title: newTask, user_id: (await supabase.auth.getUser()).data.user.id }])
            .select();

        if (!error && data) {
            setTasks([data[0], ...tasks]);
            setNewTask('');
        }
    };

    const toggleTask = async (task) => {
        const { error } = await supabase
            .from('tasks')
            .update({ is_completed: !task.is_completed })
            .eq('id', task.id);

        if (!error) {
            setTasks(tasks.map(t => t.id === task.id ? { ...t, is_completed: !t.is_completed } : t));
        }
    };

    const deleteTask = async (id) => {
        const { error } = await supabase
            .from('tasks')
            .delete()
            .eq('id', id);

        if (!error) {
            setTasks(tasks.filter(t => t.id !== id));
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/login');
    };

    return (
        <div className="home-feed" style={{ paddingBottom: '80px' }}>
            {/* Header */}
            <section className="container" style={{ padding: '1rem 20px', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '0.2rem' }}>
                        Good Morning, <span className="text-gradient">{user?.user_metadata?.full_name || 'Chef'}</span>
                    </h2>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Ready to fuel your day?</p>
                </div>
                <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'var(--color-primary)', cursor: 'pointer' }}>
                    Logout
                </button>
            </section>

            {/* Task Manager Section */}
            <section className="container" style={{ padding: '0 20px', marginBottom: '2rem' }}>
                <div className="glass-panel" style={{ padding: '1rem' }}>
                    <h3 style={{ marginBottom: '1rem' }}>My Tasks</h3>
                    <form onSubmit={addTask} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="Add a new task..."
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            style={{ flex: 1 }}
                        />
                        <button type="submit" className="btn-primary" style={{ padding: '0 1rem' }}>+</button>
                    </form>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {tasks.map(task => (
                            <li key={task.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <input
                                        type="checkbox"
                                        checked={task.is_completed}
                                        onChange={() => toggleTask(task)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                    <span style={{
                                        textDecoration: task.is_completed ? 'line-through' : 'none',
                                        color: task.is_completed ? 'var(--color-text-muted)' : 'var(--color-text)'
                                    }}>
                                        {task.title}
                                    </span>
                                </div>
                                <button onClick={() => deleteTask(task.id)} style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer', fontSize: '1.2rem' }}>
                                    &times;
                                </button>
                            </li>
                        ))}
                        {tasks.length === 0 && <p style={{ color: 'var(--color-text-muted)', textAlign: 'center' }}>No tasks yet.</p>}
                    </ul>
                </div>
            </section>

            {/* Categories */}
            <section className="category-scroll">
                {categories.map((cat) => (
                    <div
                        key={cat}
                        className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
                        onClick={() => setActiveCategory(cat)}
                    >
                        {cat}
                    </div>
                ))}
            </section>

            {/* Featured / Recommended */}
            <section className="container" style={{ marginTop: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', padding: '0 20px' }}>
                    <h3>Recommended for You</h3>
                    <span style={{ color: 'var(--color-primary)', fontSize: '0.9rem', cursor: 'pointer' }}>See All</span>
                </div>
                {/* Helper: Just reusing meal grid for demo, normally a horizontal scroll or featured card */}
                <div className="meal-grid">
                    {meals.slice(0, 2).map((meal, index) => (
                        <MealCard key={index} {...meal} />
                    ))}
                </div>
            </section>

            {/* All Meals */}
            <section className="container" style={{ marginTop: '2rem' }}>
                <div style={{ padding: '0 20px', marginBottom: '1rem' }}>
                    <h3>Explore Meals</h3>
                </div>
                <div className="meal-grid">
                    {meals.map((meal, index) => (
                        <MealCard key={index + 10} {...meal} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Dashboard;

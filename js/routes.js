import List from './pages/List.js';
import Leaderboard from './pages/Leaderboard.js';
import Roulette from './pages/Roulette.js';
import SubmitPage from './pages/SubmitPage.js';
import AdminPage from './pages/AdminPage.js';

export default [
    { path: '/', component: List },
    { path: '/leaderboard', component: Leaderboard },
    { path: '/roulette', component: Roulette },
    { path: '/submit', component: SubmitPage },  // <== Ajouter la route Submit
    { path: '/admin', component: AdminPage },  
];

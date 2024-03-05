
import "./NavBar.scss";
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import { useStyletron } from 'baseui';
import { Button } from 'baseui/button';
import { Layer } from 'baseui/layer';
import {
    ChevronDown,
    Delete,
    Overflow,
    Upload,
    Blank,
    Search,
    TriangleRight,
    CheckIndeterminate,
    ChevronLeft,
    ArrowRight,
    ChevronRightSmall,
    ChevronRight
} from 'baseui/icon';
import { StyledLink } from "baseui/link";
import {
    AppNavBar,
    setItemActive,
    mapItemsActive,
    NavItem,
} from 'baseui/app-nav-bar';

export default function NavBar({ currentUser, setCurrentUser, photoURL }) {
    const [css] = useStyletron();
    const navigate = useNavigate();

    const [mainItems, setMainItems] = React.useState([
        { icon: Search, label: 'Search' },
        {
            icon: ChevronDown,
            label: 'Players',
            navExitIcon: ChevronLeft,
            children: [
                { icon: Blank, label: 'Rosters' },
                { icon: Blank, label: 'RostersV2' },
                { icon: Blank, label: 'Favorites' },
                { icon: Blank, label: 'Recently Searched' },
                { icon: Blank, label: 'conley_example' }
            ],
        },
        {
            icon: ChevronDown,
            label: 'Teams',
            navExitIcon: ChevronLeft,
            children: [
                { icon: Blank, label: 'Standings' },
                { icon: Blank, label: 'Schedule' },
                { icon: Blank, label: 'Stats' },
                { icon: Blank, label: 'Games' }
            ],
        },
        {
            icon: Blank,
            label: 'Prop Predictor',
        },
    ]);

    const [userItems, setUserItems] = React.useState([
        { icon: Blank, label: 'Home' },
        { icon: Blank, label: 'User' }
    ]);

    const [isNavVisible, setIsNavVisible] = React.useState(true);

    function handleMainItemSelect(item) {
        setMainItems((prev) => setItemActive(prev, item));
        if (item.label === "Maps")
            navigate('/maps');
        if (item.label === "Rosters")
            navigate('/conley_example');
        if (item.label === "test line chart 2")
            navigate('/chartLine');
        if (item.label === "conley")
            navigate('/conley_example');
        if (item.label === "Standings")
            navigate('/teamstandingsV2');
        if (item.label === "Games")
            navigate('/GamesSchedule');

        if (item.label === "RostersV2")
            navigate('/player_stats_table');

        if(item.label === "Search")
        navigate('/Search');

        if(item.label === "Prop Predictor")
        navigate('/predict');

    }

    function handleUserItemSelect(item) {
        setUserItems((prev) => setItemActive(prev, item));
        setMainItems((prev) => setItemActive(prev, item));
        if (item.label === "User")
            navigate('/loggedInPage');
        if (item.label === "Home")
            navigate('/');
    }
    return (
        <div className="navbar__updated">
            <React.Fragment>
                {isNavVisible && (
                    <Layer>
                        <div
                            className={css({
                                boxSizing: 'border-box',
                                width: '100vw',
                                position: 'fixed',
                                top: '0',
                                left: '0',
                            })}
                        >
                            <AppNavBar
                                title="Court IQ"
                                mainItems={mainItems}
                                userItems={userItems}
                                onMainItemSelect={handleMainItemSelect}
                                onUserItemSelect={(item) => handleUserItemSelect(item)}
                                username={currentUser ? currentUser.displayName : "User"}
                                usernameSubtitle="Pursuit Fellow"
                                userImgUrl={!/[<>]/.test(photoURL) && currentUser ? photoURL : "https://api.dicebear.com/7.x/adventurer/svg?seed=Bandit"}
                            />
                        </div>
                    </Layer>
                )}
            </React.Fragment>
        </div>
    );
};

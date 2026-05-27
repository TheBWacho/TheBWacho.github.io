<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exiled Lands Server Portal</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <header>
        <h1>Exiled Lands</h1>
    </header>

    <nav>
        <ul>
            <li><a href="#" class="active" onclick="openTab(event, 'home')">Home</a></li>
            <li><a href="#" onclick="openTab(event, 'races')">Races</a></li>
            <li><a href="#" onclick="openTab(event, 'mods')">Mod List</a></li>
            <li><a href="#" onclick="openTab(event, 'rules')">Rules</a></li>
        </ul>
    </nav>

    <main>
        <div class="content-area">
            
            <section id="home" class="tab-content">
                <h2>Message from the Admin</h2>
                <p>Welcome to our custom Conan Exiles experience. Survive, build, and dominate in a land where custom lore meets brutal combat.</p>
                <p>Check the tabs above to explore our unique race system, the current mod configuration, and our server rules.</p>
            </section>

            <section id="races" class="tab-content">
                <h2>Custom Races</h2>
                <p>Choose your lineage wisely. Each race brings its own history to the Exiled Lands.</p>
                <ul class="race-list">
                    <li><strong>Human:</strong> Adaptable and ambitious.</li>
                    <li><strong>Elven:</strong> Ancient keepers of magic.</li>
                    <li><strong>Dwarven:</strong> Masters of stone and steel.</li>
                    <li><strong>Fae:</strong> Flighty and mysterious spirits.</li>
                    <li><strong>Other Worlder:</strong> Those from beyond the veil.</li>
                    <li><strong>Goblinoid:</strong> Savage and resilient.</li>
                </ul>
            </section>

            <section id="mods" class="tab-content">
                <h2>Server Mod List</h2>
                <p>Our server uses a curated list of mods to enhance gameplay and roleplay immersion. Click any mod to view its Workshop page.</p>
                <div id="mod-container">
                    <p><em>Loading mod data from the archives...</em></p>
                </div>
            </section>

            <section id="rules" class="tab-content">
                <h2>Server Laws & Code of Conduct</h2>
                <p class="rule-intro">By entering the Exiled Lands, you agree to the following digital signature. Failure to comply results in exile (ban).</p>

                <div class="rule-block">
                    <h3>1. Mandatory Discord & Clans</h3>
                    <ul>
                        <li><strong>Discord is mandatory.</strong> Leaving the Discord will result in the deletion of your base and character.</li>
                        <li><strong>Clan Membership:</strong> All players must be in a clan (Max 5 players). Solo players not in a clan may be deleted.</li>
                    </ul>
                </div>

                <div class="rule-block">
                    <h3>2. Building & Bases</h3>
                    <ul>
                        <li><strong>Limit:</strong> One base per Clan. No satellite bases.</li>
                        <li><strong>Dimensions:</strong> Max size 25x25x15. Everything must fit in this footprint.</li>
                        <li><strong>Piece Count:</strong> 1500 build pieces / 250 placeables. (+250 build/+25 placeables per extra member).</li>
                        <li><strong>Foundations:</strong> Max 2 stacked foundations. No floating bases or invisible pillars.</li>
                        <li><strong>Location:</strong> Do NOT build near POIs, temples, admin builds, or resource spawns. If there is an "eye" marker on the map, do not build there.</li>
                    </ul>
                </div>

                <div class="rule-block">
                    <h3>3. Benches & Followers</h3>
                    <ul>
                        <li><strong>Workstations:</strong> 1 of each per clan (Exceptions: 2 for furnaces, grinders, presses, and dryers).</li>
                        <li><strong>Travel:</strong> No map rooms at bases (Use /warps and /home). No benches or wheels outside of base limits.</li>
                        <li><strong>Followers:</strong> Max 3 following (with Authority perk). Max 4 pets and 4 thralls guarding per clan.</li>
                        <li><strong>Total Count:</strong> Keep total placed thralls/pets to 20 or less. All others must stay in storage.</li>
                    </ul>
                </div>

                <div class="rule-block">
                    <h3>4. Conduct & RP</h3>
                    <ul>
                        <li><strong>Theft:</strong> Stealing is strictly prohibited and can lead to a ban.</li>
                        <li><strong>RP/ERP:</strong> This is an RP server. ERP must be private (at base) and kept to whispers. No public nudity.</li>
                        <li><strong>Absences:</strong> Notify Admins in Discord if you will be away for more than 10 days.</li>
                        <li><strong>Admin Authority:</strong> Do not lawyer the rules. Admin words are final. Toxic behavior or arguing results in an immediate ban.</li>
                    </ul>
                </div>

                <p class="rule-footer">
                    <em>Using the passwords to bypass doors is your digital signature that you are 18+ and agree to these terms.</em>
                </p>
            </section>
        </div>

        <aside class="sidebar">
            <h3>Server Info</h3>
            <p><strong>Status:</strong> <span id="status-text" style="color: #a69a85;">Checking...</span></p>
            <p><strong>Map:</strong> The Exiled Lands</p>
            
            <button class="btn-copy" onclick="copyIP()">Copy Server IP</button>
            
            <a href="https://discord.gg/gmgJWXzHSC" target="_blank" class="btn-discord">Join Our Discord</a>
        </aside>
    </main>

    <footer>
        <p>&copy; 2026 Conan Server Community</p>
    </footer>

    <script src="script.js"></script>
</body>
</html>

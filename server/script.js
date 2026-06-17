/**
 * Exiled Lands Server Portal - Main Script
 */

// Google Apps Script Web App URL for the Mod List and Server Status Proxy
const SHEET_API_URL = "https://script.google.com/macros/s/AKfycbwidxTTzJihIeO12Au6E5DDlsTAiGWlMRN5o0JSmN-mi6y7YZQ7a-z8S4mbrD2GOjFBKw/exec";

/**
 * Handles tab switching by toggling visibility and active classes.
 */
function openTab(event, tabName) {
    event.preventDefault();
    const tabs = document.querySelectorAll('nav a');
    tabs.forEach(tab => tab.classList.remove('active'));
    event.currentTarget.classList.add('active');

    const contentSections = document.querySelectorAll('.tab-content');
    contentSections.forEach(section => section.style.display = "none");

    const activeSection = document.getElementById(tabName);
    if (activeSection) {
        activeSection.style.display = "block";
    }
}

/**
 * Copies the Server IP to the clipboard for players.
 */
function copyIP() {
    // Game Port / Direct Connect Port
    const ipAddress = "98.165.20.97:7009"; 
    navigator.clipboard.writeText(ipAddress).then(() => {
        alert("Copied 98.165.20.97:7009 to clipboard! Paste it into the Direct Connect Box in Game");
    }).catch(err => {
        console.error('Could not copy text: ', err);
    });
}

/**
 * Fetches the dynamic mod list from the Google Sheet and builds the HTML.
 */
async function loadMods() {
    const modContainer = document.getElementById('mod-container');
    try {
        const response = await fetch(SHEET_API_URL);
        const mods = await response.json();

        if (mods.length === 0) {
            modContainer.innerHTML = "<p>No mods found in the archives.</p>";
            return;
        }

        let html = '<ul class="race-list">'; 
        mods.forEach(mod => {
            if (mod.url !== "") {
                // FIXED: Changed mod.name to mod.title
                html += `<li><a href="${mod.url}" target="_blank" style="color: #a69a85; text-decoration: none; border-bottom: 1px dotted #b33030; transition: color 0.2s;"><strong>${mod.title}</strong></a></li>`;
            } else {
                // FIXED: Changed mod.name to mod.title
                html += `<li><strong>${mod.title}</strong></li>`;
            }
        });
        html += '</ul>';
        modContainer.innerHTML = html;

    } catch (error) {
        console.error("Error fetching mods:", error);
        modContainer.innerHTML = "<p style='color: #b33030;'>Failed to load the mod list. The sorcery was disrupted.</p>";
    }
}

/**
 * Checks if the game server is online via Google Apps Script Proxy (Now using BattleMetrics)
 */
async function checkServerStatus() {
  const url = SHEET_API_URL + "?action=status";
  const statusText = document.getElementById('status-text');
  
  // Set to 'Checking...' while it loads
  statusText.innerText = "Checking...";
  statusText.style.color = "#a69a85"; 

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    // --> THIS WILL PRINT BATTLEMETRICS EXACT ANSWER IN YOUR BROWSER CONSOLE (F12) <--
    console.log("BattleMetrics API Response:", data); 
    
    // Check if BattleMetrics successfully returned the data and it says online
    if (data && data.data && data.data.attributes && data.data.attributes.status === "online") {
      const players = data.data.attributes.players;
      const maxPlayers = data.data.attributes.maxPlayers;

      statusText.innerText = `Online (${players}/${maxPlayers})`;
      statusText.style.color = "#4CAF50"; // Conan green
    } else {
      statusText.innerText = "Offline";
      statusText.style.color = "#b33030"; // Conan red
    }
  } catch (error) {
    console.error('Failed to reach server status:', error);
    statusText.innerText = "Unknown";
    statusText.style.color = "#a69a85"; 
  }
}

// Automatically load the mods AND check server status when the page finishes loading
window.addEventListener('DOMContentLoaded', () => {
    loadMods();
    checkServerStatus();
});
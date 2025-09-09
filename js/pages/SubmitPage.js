export default {
    template: `
        <div class="submit-record-page">
            <h2>Submit Your Record</h2>
            <form id="submitForm">
                <input id="username" placeholder="Your Name" required />
                <select id="levelSelect"></select>
                <input id="score" type="number" placeholder="Score" required />
                <button type="submit">Submit</button>
            </form>
            <p id="message"></p>
        </div>
    `,
    mounted() {
        // Charger les niveaux depuis _list.json
        fetch("/data/_list.json")
            .then(res => res.json())
            .then(data => {
                const select = document.getElementById("levelSelect");
                data.forEach(lvl => {
                    const opt = document.createElement("option");
                    opt.value = lvl;
                    opt.innerText = lvl;
                    select.appendChild(opt);
                });
            });

        // Gestion du submit
        document.getElementById("submitForm").addEventListener("submit", e => {
            e.preventDefault();
            const username = document.getElementById("username").value;
            const level = document.getElementById("levelSelect").value;
            const score = document.getElementById("score").value;

            // Stocker le record en pending
            const pending = JSON.parse(localStorage.getItem("pendingRecords") || "[]");
            pending.push({ username, level, score, date: new Date().toLocaleString() });
            localStorage.setItem("pendingRecords", JSON.stringify(pending));

            document.getElementById("message").innerText = "Record submitted! Waiting for admin validation.";
            e.target.reset();
        });
    }
};

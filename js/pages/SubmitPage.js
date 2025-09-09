export default {
    template: `
        <div class="submit-record-page">
            <h2>Submit Your Record</h2>
            <form id="submitForm">
                <input id="username" placeholder="Your Name" required />
                <select id="levelSelect"></select>
                <input id="score" type="number" placeholder="Score %" required />
                <input id="hz" type="number" placeholder="Hz" required />
                <input id="videoLink" placeholder="YouTube link" required />
                <button type="submit">Submit</button>
            </form>
            <p id="message"></p>
        </div>
    `,
    mounted() {
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

        document.getElementById("submitForm").addEventListener("submit", e => {
            e.preventDefault();

            const record = {
                username: document.getElementById("username").value,
                level: document.getElementById("levelSelect").value,
                score: Number(document.getElementById("score").value),
                hz: Number(document.getElementById("hz").value),
                videoLink: document.getElementById("videoLink").value,
                date: new Date().toLocaleString()
            };

            let pending = JSON.parse(localStorage.getItem("pendingRecords") || "[]");
            pending.push(record);
            localStorage.setItem("pendingRecords", JSON.stringify(pending));

            document.getElementById("message").innerText = "Record submitted! Waiting for admin validation.";
            e.target.reset();
        });
    }
};

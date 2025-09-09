export default {
    template: `
        <div class="admin-page">
            <h2>Pending Records</h2>
            <ul id="recordsList"></ul>
        </div>
    `,
    mounted() {
        const recordsList = document.getElementById("recordsList");

        function renderRecords() {
            recordsList.innerHTML = "";
            const records = JSON.parse(localStorage.getItem("pendingRecords") || "[]");
            records.forEach((r, i) => {
                const li = document.createElement("li");
                li.innerHTML = `
                    ${r.date} - <strong>${r.username}</strong> | Level: ${r.level} | Score: ${r.score}% | Hz: ${r.hz} 
                    <a href="${r.videoLink}" target="_blank">Video</a>
                    <button data-index="${i}" class="approve">Approve</button>
                `;
                recordsList.appendChild(li);
            });
        }

        renderRecords();

        recordsList.addEventListener("click", e => {
            if (e.target.classList.contains("approve")) {
                const idx = e.target.getAttribute("data-index");
                const pending = JSON.parse(localStorage.getItem("pendingRecords") || "[]");
                const record = pending[idx];

                // Envoi au serveur
                fetch('/api/validateRecord', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        levelFile: record.level.replace('.json',''), // ex: Sample2
                        user: record.username,
                        link: record.videoLink,
                        percent: record.score,
                        hz: record.hz
                    })
                })
                .then(res => res.json())
                .then(res => {
                    if(res.success) {
                        pending.splice(idx, 1);
                        localStorage.setItem("pendingRecords", JSON.stringify(pending));
                        renderRecords();
                    } else {
                        alert("Error saving record on server");
                    }
                });
            }
        });
    }
};

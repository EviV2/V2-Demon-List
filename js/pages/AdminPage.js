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
            recordsList.innerHTML = ""; // vider avant de recharger
            const records = JSON.parse(localStorage.getItem("pendingRecords") || "[]");
            records.forEach((r, i) => {
                const li = document.createElement("li");
                li.innerHTML = `
                    ${r.date} - <strong>${r.username}</strong> | Level: ${r.level} | Score: ${r.score}
                    <button data-index="${i}" class="approve">Approve</button>
                `;
                recordsList.appendChild(li);
            });
        }

        renderRecords();

        // Fonction pour valider (supprimer) un record
        recordsList.addEventListener("click", e => {
            if (e.target.classList.contains("approve")) {
                const idx = e.target.getAttribute("data-index");
                const pending = JSON.parse(localStorage.getItem("pendingRecords") || "[]");
                pending.splice(idx, 1);
                localStorage.setItem("pendingRecords", JSON.stringify(pending));
                renderRecords();
            }
        });
    }
};

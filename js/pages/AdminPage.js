export default {
  template: `
    <div class="admin-page">
      <h1>Admin Panel</h1>
      <div v-if="!authorized">
        <label>Admin Password</label>
        <input type="password" v-model="password" />
        <button @click="login">Login</button>
      </div>

      <div v-else>
        <h2>Pending Submissions</h2>
        <ul>
          <li v-for="(record, index) in pending" :key="index">
            <b>{{ record.username }}</b> on <i>{{ record.level }}</i>
            — {{ record.score }}% @ {{ record.hz }}Hz
            (<a :href="record.videoLink" target="_blank">Video</a>)
            <button @click="approve(index, record.level)">Approve</button>
          </li>
        </ul>
      </div>
      <p v-if="message">{{ message }}</p>
    </div>
  `,
  data() {
    return {
      password: "",
      authorized: false,
      pending: [],
      message: ""
    };
  },
  methods: {
    async login() {
      this.authorized = true;
      await this.fetchPending();
    },
    async fetchPending() {
      const res = await fetch("https://api-worker.<ton-compte>.workers.dev/pending");
      this.pending = await res.json();
    },
    async approve(index, level) {
      const res = await fetch("https://api-worker.<ton-compte>.workers.dev/approveRecord", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.password}`
        },
        body: JSON.stringify({ index, level })
      });
      this.message = await res.text();
      await this.fetchPending();
    }
  }
};

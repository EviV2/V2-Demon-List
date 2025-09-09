export default {
  template: `
    <div class="submit-page">
      <h1>Submit a Record</h1>
      <form @submit.prevent="submitRecord">
        <label>Username</label>
        <input v-model="username" required />

        <label>Level Name</label>
        <input v-model="level" required />

        <label>Percent</label>
        <input type="number" v-model="score" required min="1" max="100" />

        <label>Refresh Rate (Hz)</label>
        <input type="number" v-model="hz" required min="30" />

        <label>Video Link</label>
        <input v-model="videoLink" required />

        <button type="submit">Submit</button>
      </form>
      <p v-if="message">{{ message }}</p>
    </div>
  `,
  data() {
    return {
      username: "",
      level: "",
      score: 100,
      hz: 60,
      videoLink: "",
      message: ""
    };
  },
  methods: {
    async submitRecord() {
      const res = await fetch("/submitPending", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: this.username,
          level: this.level,
          score: this.score,
          hz: this.hz,
          videoLink: this.videoLink
        })
      });
      this.message = await res.text();
    }
  }
};

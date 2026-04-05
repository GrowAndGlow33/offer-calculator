import { useState, useEffect } from "react";

export default function PricingApp() {
  const [photos, setPhotos] = useState("");
  const [reels, setReels] = useState("");
  const [products, setProducts] = useState("");
  const [projects, setProjects] = useState([]);

  const subtotal = products * (photos * 10.75) + reels * 20;

  let final = subtotal;
  let packageName = "Custom";

  if (subtotal <= 351 && products <= 3 && photos <= 9) {
    packageName = "Πακέτο Boost";
  } else if (
    subtotal > 351 &&
    subtotal <= 649 &&
    products > 3 &&
    products <= 5 &&
    photos >= 6
  ) {
    packageName = "Πακέτο Elevate";
  } else if (subtotal > 649 && products > 5 && photos >= 6) {
    final = subtotal * (1 - 0.0682);
    packageName = "Πακέτο Dominate (με έκπτωση)";
  }

  const xfCredits = 2.2 * (photos * products);
  const nimCredits = 8.75 * reels;

  useEffect(() => {
    const saved = localStorage.getItem("projects");
    if (saved) setProjects(JSON.parse(saved));
  }, []);

  const saveProject = () => {
    const newProject = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      photos,
      reels,
      products,
      final: final.toFixed(2),
      packageName,
      xfCredits,
      nimCredits,
    };

    const updated = [newProject, ...projects];
    setProjects(updated);
    localStorage.setItem("projects", JSON.stringify(updated));
  };

  const clearHistory = () => {
    localStorage.removeItem("projects");
    setProjects([]);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Grow and Glow</h1>
        <p style={styles.subtitle}>Offer Calculator</p>

        <div style={styles.inputs}>
          <label style={styles.label}>Προϊόντα</label>
          <input
            type="number"
            value={products}
            onChange={(e) => setProducts(e.target.value)}
            style={styles.input}
          />

          <label style={styles.label}>Φωτογραφίες</label>
          <input
            type="number"
            value={photos}
            onChange={(e) => setPhotos(e.target.value)}
            style={styles.input}
          />

          <label style={styles.label}>Reels</label>
          <input
            type="number"
            value={reels}
            onChange={(e) => setReels(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.resultCard}>
          <p>Υποσύνολο: €{subtotal.toFixed(2)}</p>
          <p style={styles.final}>Τελική Τιμή: €{final.toFixed(2)}</p>
          <p style={styles.package}>{packageName}</p>
          <p>Τιμή με ΦΠΑ: €{(final * 1.24).toFixed(2)}</p>
        </div>

        <button onClick={saveProject} style={styles.button}>
          💾 Αποθήκευση Προσφοράς
        </button>

        <button onClick={clearHistory} style={styles.clearButton}>
          🧹 Καθαρισμός Ιστορικού Προσφορών
        </button>

        <div style={styles.creditsBox}>
          <p style={styles.creditsTitle}>Απαιτούμενα Credits</p>
          <p>Credits για Xf: {Math.round(xfCredits)}</p>
          <p>Credits για Nim: {Math.round(nimCredits)}</p>
        </div>

        <div style={styles.historyBox}>
          <p style={styles.creditsTitle}>Ιστορικό Προσφορών</p>
          {projects.length === 0 && <p>Δεν υπάρχουν αποθηκευμένα projects</p>}

          {projects.map((p) => (
            <div key={p.id} style={styles.historyItem}>
              <p>
                <b>{p.date}</b>
              </p>
              <p>
                Φωτογραφίες: {p.photos} | Reels: {p.reels} | Προϊόντα:{" "}
                {p.products}
              </p>
              <p>
                €{p.final} — {p.packageName}
              </p>
              <p>Credits για Xf: {Math.round(xfCredits)} </p>
              <p>Credits για Xf: {Math.round(nimCredits)} </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f76b8a, #f7d060)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "sans-serif",
  },
  card: {
    background: "#f2f2f2",
    padding: "30px",
    borderRadius: "25px",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
  },
  title: {
    textAlign: "center",
    color: "#ff4d8d",
    marginBottom: "5px",
  },
  subtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: "20px",
  },
  label: {
    fontWeight: "bold",
    marginTop: "10px",
    color: "#333",
  },
  inputs: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    background: "#f7e7a9",
    fontSize: "16px",
    marginTop: "5px",
  },
  resultCard: {
    marginTop: "20px",
    padding: "15px",
    borderRadius: "15px",
    background: "#ffe4ec",
  },
  final: {
    fontWeight: "bold",
    fontSize: "18px",
  },
  package: {
    color: "#ff4d8d",
    fontWeight: "bold",
  },
  button: {
    marginTop: "20px",
    width: "100%",
    padding: "14px",
    borderRadius: "15px",
    border: "none",
    background: "#ff4d8d",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },
  clearButton: {
    marginTop: "10px",
    width: "100%",
    padding: "12px",
    borderRadius: "12px",
    border: "none",
    background: "#999",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },
  creditsBox: {
    marginTop: "20px",
    padding: "15px",
    borderRadius: "15px",
    background: "#fff7cc",
  },
  creditsTitle: {
    fontWeight: "bold",
    marginBottom: "5px",
  },
  historyBox: {
    marginTop: "20px",
    padding: "15px",
    borderRadius: "15px",
    background: "#ffffff",
    maxHeight: "200px",
    overflowY: "auto",
  },
  historyItem: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
    marginBottom: "10px",
  },
};

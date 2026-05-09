import { useState } from "react";

//COMMON MEDICINES USERS CAN CHOOSE FROM
const MEDICINE_DATABASE = [
  { id: 1, name: "Aspirin", commonDoses: ["81mg", "325mg", "500mg"], category: "Pain Relief" },
  { id: 2, name: "Atorvastatin", commonDoses: ["10mg", "20mg", "40mg", "80mg"], category: "Cholesterol" },
  { id: 3, name: "Lisinopril", commonDoses: ["2.5mg", "5mg", "10mg", "20mg", "40mg"], category: "Blood Pressure" },
  { id: 4, name: "Metformin", commonDoses: ["500mg", "850mg", "1000mg"], category: "Diabetes" },
  { id: 5, name: "Amlodipine", commonDoses: ["2.5mg", "5mg", "10mg"], category: "Blood Pressure" },
  { id: 6, name: "Levothyroxine", commonDoses: ["25mcg", "50mcg", "75mcg", "100mcg", "125mcg"], category: "Thyroid" },
  { id: 7, name: "Omeprazole", commonDoses: ["10mg", "20mg", "40mg"], category: "Digestive" },
  { id: 8, name: "Sertraline", commonDoses: ["25mg", "50mg", "100mg"], category: "Mental Health" },
  { id: 9, name: "Simvastatin", commonDoses: ["5mg", "10mg", "20mg", "40mg"], category: "Cholesterol" },
  { id: 10, name: "Losartan", commonDoses: ["25mg", "50mg", "100mg"], category: "Blood Pressure" },
  { id: 11, name: "Albuterol", commonDoses: ["2mg", "4mg", "90mcg inhaler"], category: "Respiratory" },
  { id: 12, name: "Gabapentin", commonDoses: ["100mg", "300mg", "400mg", "600mg", "800mg"], category: "Nerve Pain" },
  { id: 13, name: "Hydrochlorothiazide", commonDoses: ["12.5mg", "25mg", "50mg"], category: "Blood Pressure" },
  { id: 14, name: "Metoprolol", commonDoses: ["25mg", "50mg", "100mg", "200mg"], category: "Heart" },
  { id: 15, name: "Pantoprazole", commonDoses: ["20mg", "40mg"], category: "Digestive" },
  { id: 16, name: "Vitamin D3", commonDoses: ["1000 IU", "2000 IU", "5000 IU"], category: "Supplement" },
  { id: 17, name: "Vitamin B12", commonDoses: ["500mcg", "1000mcg", "2500mcg"], category: "Supplement" },
  { id: 18, name: "Fish Oil", commonDoses: ["500mg", "1000mg", "2000mg"], category: "Supplement" },
  { id: 19, name: "Melatonin", commonDoses: ["0.5mg", "1mg", "3mg", "5mg", "10mg"], category: "Sleep" },
  { id: 20, name: "Ibuprofen", commonDoses: ["200mg", "400mg", "600mg", "800mg"], category: "Pain Relief" },
  { id: 99, name: "Custom / Other", commonDoses: [], category: "Custom" },
];

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const DAY_SHORT = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const CATEGORIES = ["All", ...new Set(MEDICINE_DATABASE.map((m) => m.category))];

const uid = () => Math.random().toString(36).slice(2, 9);

const defaultEntry = () => ({
  id: uid(),
  medicineId: "",
  customName: "",
  dose: "",
  customDose: "",
  pillCount: 1,
  days: [...DAYS],
  schedTimes: ["08:00"],
  notes: "",
  withFood: false,
  color: "#3b82f6",
});

function MedicineSearch({ value, onChange }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [open, setOpen] = useState(false);

  const selected = MEDICINE_DATABASE.find((m) => m.id === value);

  const filtered = MEDICINE_DATABASE.filter((m) => {
    const matchCat = category === "All" || m.category === category;
    const matchQ = m.name.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <div style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={{ 
          width: "100%",
          padding: "10px 14px",
          background: "#0f172a" ,
          // background: "#0D241A" ,
          border: "1.5px solid #334155",
          borderRadius: 8,
          color: selected ? "#e2e8f0" : "#64748b",
          textAlign: "left",
          // textAlign: "center",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 14,
        }}
      >
        <span>{selected ? selected.name : "Select medicine…"}</span>
        <span style={{ color: "#64748b" }}>{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            zIndex: 100,
            top: "calc(100% + 6px)",
            left: 0,
            right: 0,
            background: "#0f172a",
            // background: "#0D241A" ,
            border: "1.5px solid #334155",
            borderRadius: 10,
            boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
            overflow: "hidden",
          }}
        >
          <div style={{ padding: "10px 12px", borderBottom: "1px solid #1e293b" }}>
            <input
              autoFocus
              placeholder="Search medicine…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "7px 10px",
                background: "#1e293b",
                border: "1px solid #334155",
                borderRadius: 6,
                color: "#e2e8f0",
                fontSize: 13,
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              gap: 6,
              padding: "8px 12px",
              borderBottom: "1px solid #1e293b",
              flexWrap: "wrap",
            }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                style={{
                  padding: "3px 10px",
                  borderRadius: 20,
                  fontSize: 11,
                  cursor: "pointer",
                  border: "none",
                  background: category === cat ? "#3b82f6" : "#1e293b",
                  color: category === cat ? "#fff" : "#94a3b8",
                  fontWeight: category === cat ? 700 : 400,
                }}
              >
                {cat}
              </button>
            ))}
          </div>
          <div style={{ maxHeight: 220, overflowY: "auto" }}>
            {filtered.length === 0 ? (
              <div style={{ padding: "16px", color: "#64748b", fontSize: 13, textAlign: "center" }}>
                No results found
              </div>
            ) : (
              filtered.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => {
                    onChange(m.id);
                    setOpen(false);
                    setQuery("");
                  }}
                  style={{
                    width: "100%",
                    padding: "9px 14px",
                    background: value === m.id ? "#1e3a5f" : "transparent",
                    border: "none",
                    color: "#e2e8f0",
                    textAlign: "left",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: 13,
                  }}
                >
                  <span>{m.name}</span>
                  <span
                    style={{
                      fontSize: 10,
                      padding: "2px 7px",
                      borderRadius: 10,
                      background: "#1e293b",
                      color: "#60a5fa",
                    }}
                  >
                    {m.category}
                  </span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function DayPicker({ selected, onChange }) {
  const toggle = (day) => {
    onChange(selected.includes(day) ? selected.filter((d) => d !== day) : [...selected, day]);
  };
  const allSelected = selected.length === DAYS.length;

  return (
    <div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 6 }}>
        {DAYS.map((day, i) => (
          <button
            key={day}
            type="button"
            onClick={() => toggle(day)}
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: "none",
              cursor: "pointer",
              background: selected.includes(day) ? "#3b82f6" : "#1e293b",
              color: selected.includes(day) ? "#fff" : "#64748b",
              fontWeight: 700,
              fontSize: 12,
            }}
          >
            {DAY_SHORT[i].slice(0, 2)}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button
          type="button"
          onClick={() => onChange([...DAYS])}
          style={quickBtn(allSelected)}
        >
          Every day
        </button>
        <button
          type="button"
          onClick={() => onChange(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"])}
          style={quickBtn(selected.join(",") === "Monday,Tuesday,Wednesday,Thursday,Friday")}
        >
          Weekdays
        </button>
        <button
          type="button"
          onClick={() => onChange(["Saturday", "Sunday"])}
          style={quickBtn(selected.join(",") === "Saturday,Sunday")}
        >
          Weekends
        </button>
      </div>
    </div>
  );
}

function quickBtn(active) {
  return {
    padding: "4px 10px",
    borderRadius: 6,
    fontSize: 11,
    cursor: "pointer",
    border: "1px solid #334155",
    background: active ? "#1e3a5f" : "transparent",
    color: active ? "#60a5fa" : "#64748b",
  };
}

function TimeEntryList({ times, onChange }) {
  const addTime = () => onChange([...times, "12:00"]);
  const removeTime = (i) => onChange(times.filter((_, idx) => idx !== i));
  const updateTime = (i, val) => onChange(times.map((t, idx) => (idx === i ? val : t)));

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {times.map((t, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: "#60a5fa", fontSize: 16 }}>🕐</span>
            <input
              type="time"
              value={t}
              onChange={(e) => updateTime(i, e.target.value)}
              style={{
                padding: "8px 12px",
                background: "#0f172a",
                // background: "#0D241A" ,
                border: "1.5px solid #334155",
                borderRadius: 8,
                color: "#e2e8f0",
                fontSize: 14,
                outline: "none",
                cursor: "pointer",
                colorScheme: "dark",
              }}
            />
            {times.length > 1 && (
              <button
                type="button"
                onClick={() => removeTime(i)}
                style={{
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.25)",
                  borderRadius: 6,
                  color: "#f87171",
                  width: 28,
                  height: 28,
                  cursor: "pointer",
                  fontSize: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addTime}
        style={{
          marginTop: 10,
          padding: "5px 14px",
          borderRadius: 7,
          border: "1px dashed #334155",
          background: "transparent",
          color: "#3b82f6",
          fontSize: 12,
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        + Add another time
      </button>
    </div>
  );
}

function EntryCard({ entry, index, onChange, onRemove }) {
  const med = MEDICINE_DATABASE.find((m) => m.id === entry.medicineId);
  const isCustom = entry.medicineId === 99;

  const set = (field, val) => onChange({ ...entry, [field]: val });

  return (
    <div
      style={{
        background: "#0f172a",
        // background: "#0D241A" ,
        border: "1.5px solid #1e293b",
        borderRadius: 14,
        padding: "20px 22px",
        position: "relative",
        borderLeft: `4px solid ${entry.color}`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 18,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "#1e293b",
              color: "#60a5fa",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: 13,
            }}
          >
            {index + 1}
          </span>
          <span style={{ color: "#94a3b8", fontWeight: 600, fontSize: 14 }}>
            {med ? med.name : "New Medication"}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <label style={{ fontSize: 12, color: "#64748b", display: "flex", alignItems: "center", gap: 4 }}>
            Color
            <input
              type="color"
              value={entry.color}
              onChange={(e) => set("color", e.target.value)}
              style={{ marginLeft: 4, width: 28, height: 28, borderRadius: 6, border: "none", cursor: "pointer", background: "transparent" }}
            />
          </label>
          <button
            type="button"
            onClick={onRemove}
            style={{
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.3)",
              borderRadius: 6,
              color: "#f87171",
              padding: "4px 10px",
              cursor: "pointer",
              fontSize: 12,
            }}
          >
            Remove
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={{ gridColumn: "1 / -1" }}>
          <Label>Medicine Name</Label>
          <MedicineSearch value={entry.medicineId} onChange={(id) => set("medicineId", id)} />
        </div>
        {isCustom && (
          <div style={{ gridColumn: "1 / -1" }}>
            <Label>Custom Medicine Name</Label>
            <Input
              value={entry.customName}
              onChange={(e) => set("customName", e.target.value)}
              placeholder="Enter medicine name"
            />
          </div>
        )}
        <div>
          <Label>Dosage</Label>
          {med && med.commonDoses.length > 0 ? (
            <select
              value={entry.dose}
              onChange={(e) => set("dose", e.target.value)}
              style={selectStyle}
            >
              <option value="">Select dose…</option>
              {med.commonDoses.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
              <option value="custom">Custom…</option>
            </select>
          ) : (
            <Input
              value={entry.customDose}
              onChange={(e) => set("customDose", e.target.value)}
              placeholder="ex. 500mg"
            />
          )}
          {entry.dose === "custom" && (
            <Input
              value={entry.customDose}
              onChange={(e) => set("customDose", e.target.value)}
              placeholder="Enter custom dose"
              style={{ marginTop: 8 }}
            />
          )}
        </div>
        <div>
          <Label>Pills per dose</Label>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button
              type="button"
              onClick={() => set("pillCount", Math.max(1, entry.pillCount - 1))}
              style={counterBtn}
            >
              −
            </button>
            <span
              style={{
                minWidth: 36,
                textAlign: "center",
                color: "#e2e8f0",
                fontWeight: 700,
                fontSize: 18,
              }}
            >
              {entry.pillCount}
            </span>
            <button
              type="button"
              onClick={() => set("pillCount", Math.min(10, entry.pillCount + 1))}
              style={counterBtn}
            >
              +
            </button>
          </div>
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <Label>Days of the week</Label>
          <DayPicker selected={entry.days} onChange={(days) => set("days", days)} />
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <Label>Time(s) of day</Label>
          <TimeEntryList times={entry.schedTimes} onChange={(schedTimes) => set("schedTimes", schedTimes)} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            type="button"
            onClick={() => set("withFood", !entry.withFood)}
            style={{
              width: 40,
              height: 22,
              borderRadius:11,
              border: "none",
              background: entry.withFood ? "#3b82f6" : "#334155",
              cursor: "pointer",
              position: "relative",
              transition: "background 0.2s",
            }}
          >
            <span
              style={{
                position: "absolute",
                top: 3,
                left: entry.withFood ? 21 : 3,
                width:  16,
                height: 16,
                borderRadius:"50%",
                background: "#fff",
                transition: "left 0.2s",
              }}
            />
          </button>
          <span style={{ color: "#94a3b8", fontSize: 13 }}>Take with food</span>
          {entry.withFood && <span>🍽️</span>}
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <Label>Notes (optional)</Label>
          <textarea
            value={entry.notes}
            onChange={(e) => set("notes", e.target.value)}
            placeholder="ex. Take with full glass of water, avoid grapefruit…"
            rows={2}
            style={{
              ...inputStyle,
              resize: "vertical",
              fontFamily: "inherit",
            }}
          />
        </div>
      </div>
    </div>
  );
}
const inputStyle = {
  width: "100%",
  padding: "10px 14px",
  background: "#0f172a",
  // background: "#0D241A" ,
  border: "1.5px solid #334155",
  borderRadius: 8,
  color: "#e2e8f0",
  fontSize: 14,
  outline: "none",
  boxSizing: "border-box",
};

const selectStyle = {
  ...inputStyle,
  cursor: "pointer",
  appearance: "none",
};


const counterBtn = {
  width: 32,
  height: 32,
  borderRadius: 8,
  border: "1.5px solid #334155",
  background: "#1e293b",
  color: "#e2e8f0",
  cursor: "pointer",
  fontSize: 18,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

function Label({ children }) {
  return (
    <div
      style={{
        color: "#ffffff",
        fontSize: 11,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        marginBottom: 7,
      }}
    >
      {children}
    </div>
  );
}



function Input({ style, ...props }) {
  return <input style={{ ...inputStyle, ...style }} {...props} />;
}
function ScheduleSummary({ entries }) {
  if (entries.length === 0) return null;

  const byDay = {};
  DAYS.forEach((d) => (byDay[d] = []));

  entries.forEach((e) => {
    const med = MEDICINE_DATABASE.find((m) => m.id === e.medicineId);
    const name = med ? (med.id === 99 ? e.customName || "Custom" : med.name) : "—";
    const dose = e.dose === "custom" ? e.customDose : e.dose || e.customDose;
    e.days.forEach((day) => {
      e.schedTimes.forEach((time) => {
        byDay[day].push({ name, dose, pillCount: e.pillCount, time, color: e.color, withFood: e.withFood });
      });
    });
  });

  return (
    <div style={{ marginTop: 32 }}>
      <h2 style={{ color: "#e2e8f0", fontWeight: 800, fontSize: 18, marginBottom: 16 }}>
        📅 Weekly Overview
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8 }}>
        {DAYS.map((day, i) => (
          <div
            key={day}
            style={{
              background: "#0f172a",
              // background: "#0D241A" ,
              border: "1px solid #1e293b",
              borderRadius: 10,
              padding: "10px 8px",
              minHeight: 90,
            }}
          >
            <div
              style={{
                color: "#60a5fa",
                fontWeight: 800,
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: 8,
                textAlign: "center",
              }}
            >
              {DAY_SHORT[i]}
            </div>
            {byDay[day].length === 0 ? (
              <div style={{ color: "#334155", fontSize: 10, textAlign: "center" }}>—</div>
            ) : (
              byDay[day].map((item, j) => (
                <div
                  key={j}
                  style={{
                    marginBottom: 5,
                    padding: "4px 6px",
                    borderRadius: 5,
                    background: `${item.color}22`,
                    borderLeft: `3px solid ${item.color}`,
                  }}
                >
                  <div style={{ color: "#e2e8f0", fontSize: 10, fontWeight: 700 }}>{item.name}</div>
                  <div style={{ color: "#94a3b8", fontSize: 9 }}>
                    🕐 {item.time}
                  </div>
                  <div style={{ color: "#64748b", fontSize: 9 }}>
                    {item.dose && `${item.dose} `}×{item.pillCount}
                    {item.withFood ? " 🍽️" : ""}
                  </div>
                </div>
              ))
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


///THIS IS THE MAIN
export default function PillScheduler() {
  const [entries, setEntries] = useState([defaultEntry()]);
  const [patientName, setPatientName] = useState("GSS TEAM 10");
  const [saved, setSaved] = useState(false);

  const addEntry = () => setEntries((e) => [...e, defaultEntry()]);

  const updateEntry = (id, updated) =>
    setEntries((e) => e.map((x) => (x.id === id ? updated : x)));

  const removeEntry = (id) => setEntries((e) => e.filter((x) => x.id !== id));

  const handleSave = () => {
    const schedule = {
      patient: patientName,
      createdAt: new Date().toISOString(),
      medications: entries.map((e) => {
        const med = MEDICINE_DATABASE.find((m) => m.id === e.medicineId);
        return {
          name: med ? (med.id === 99 ? e.customName : med.name) : "",
          dose: e.dose === "custom" ? e.customDose : e.dose || e.customDose,
          pillCount: e.pillCount,
          days: e.days,
          times: e.schedTimes,
          withFood: e.withFood,
          notes: e.notes,
          color: e.color,
        };
      }),
    };
    console.log("Schedule saved:", JSON.stringify(schedule, null, 2));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020817",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        padding: "32px 20px",
        color: "#e2e8f0",
      }}
    >
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ marginBottom: 32, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>💊</div>
          <h1 style={{ fontSize: 28, fontWeight: 900, color: "#f1f5f9", margin: 0 }}>
            MEDLINE
          </h1>
          <p style={{ color: "#475569", marginTop: 6, fontSize: 14 }}>
            your personal smart pillbox
          </p>
        </div>

        <div style={{ marginBottom: 24 }}>
          <Label>Patient / Profile Name</Label>
          <Input
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            placeholder="ex. John Smith"
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {entries.map((entry, i) => (
            <EntryCard
              key={entry.id}
              entry={entry}
              index={i}
              onChange={(updated) => updateEntry(entry.id, updated)}
              onRemove={() => removeEntry(entry.id)}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={addEntry}
          style={{
            marginTop: 16,
            width: "100%",
            padding: "14px",
            borderRadius: 10,
            border: "2px dashed #1e293b",
            background: "transparent",
            color: "#3b82f6",
            fontWeight: 700,
            fontSize: 15,
            cursor: "pointer",
            letterSpacing: "0.02em",
          }}
        >
          + Add Medication
        </button>

        <ScheduleSummary entries={entries} />

        <div style={{ marginTop: 28, display: "flex", justifyContent: "flex-end" }}>
          <button
            type="button"
            onClick={handleSave}
            style={{
              padding: "13px 36px",
              borderRadius: 10,
              border: "none",
              background: saved ? "#16a34a" : "#3b82f6",
              color: "#fff",
              fontWeight: 800,
              fontSize:15,
              cursor: "pointer",
              transition: "background 0.3s",
              boxShadow: `0 0 24px ${saved ? "rgba(22,163,74,0.4)" : "rgba(59,130,246,0.4)"}`,
            }}
          >
            {saved ? "✓ Schedule Saved!" : "Save Schedule"}
          </button>
        </div>
      </div>
    </div>
  );
}

// 1. KONEKSI SUPABASE
const supabaseUrl = "https://rbprbhmzgnusugavfkav.supabase.co";
const supabaseKey = "sb_publishable_R7r9sY6csHPpjN7D0OUZVA_NzQEru2o";
const supabase = supabasejs.createClient(supabaseUrl, supabaseKey);

// 2. ELEMEN HTML
const sjSelect = document.getElementById("sjSelect");
const namaPos = document.getElementById("namaPos");
const tableBody = document.getElementById("tableBody");
console.log("Script loaded");
// 3. LOAD DROPDOWN NO SURAT JALAN
async function loadSuratJalan() {
  const { data, error } = await supabase
    .from("picking")
    .select("no_surat_jalan");

  if (error) {
    console.error("Error ambil surat jalan:", error);
    return;
  }

  if (!data || data.length === 0) {
    console.log("Data picking kosong");
    return;
  }

  const uniqueSJ = [...new Set(data.map(d => d.no_surat_jalan))];

  uniqueSJ.forEach(sj => {
    const option = document.createElement("option");
    option.value = sj;
    option.textContent = sj;
    sjSelect.appendChild(option);
  });
}

await loadSuratJalan();

// ================================
// SAAT SURAT JALAN DIPILIH
// ================================
sjSelect.addEventListener("change", async () => {
  tableBody.innerHTML = "";
  namaPos.textContent = "-";

  if (!sjSelect.value) return;

  const { data, error } = await supabase
    .from("picking")
    .select("*")
    .eq("no_surat_jalan", sjSelect.value);

  if (error) {
    console.error("Error ambil detail picking:", error);
    return;
  }

  if (!data || data.length === 0) return;

  namaPos.textContent = data[0].nama_pos;

  data.forEach(row => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${row.sku}</td>
      <td>${row.nama_varian}</td>
      <td>${row.qty_plan}</td>
      <td>
        <input type="number" value="${row.qty_pick ?? ""}" />
      </td>
    `;

    tableBody.appendChild(tr);
  });
});

loadSuratJalan();




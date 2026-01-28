// 1. KONEKSI SUPABASE
const supabaseUrl = "https://rbprbhmzgnusugavfkav.supabase.co";
const supabaseKey = "sb_publishable_R7r9sY6csHPpjN7D0OUZVA_NzQEru2o";
const supabase = supabasejs.createClient(supabaseUrl, supabaseKey);

// 2. ELEMEN HTML
const sjSelect = document.getElementById("sjSelect");
const namaPos = document.getElementById("namaPos");
const tableBody = document.getElementById("tableBody");

// 3. LOAD DROPDOWN NO SURAT JALAN
async function loadSuratJalan() {
  const { data } = await supabase
    .from("picking")
    .select("no_surat_jalan")
    .neq("no_surat_jalan", null);

  const uniqueSJ = [...new Set(data.map(d => d.no_surat_jalan))];

  uniqueSJ.forEach(sj => {
    const opt = document.createElement("option");
    opt.value = sj;
    opt.textContent = sj;
    sjSelect.appendChild(opt);
  });
}

loadSuratJalan();

// 4. SAAT DROPDOWN DIPILIH
sjSelect.addEventListener("change", async () => {
  tableBody.innerHTML = "";
  namaPos.textContent = "-";

  if (!sjSelect.value) return;

  const { data } = await supabase
    .from("picking")
    .select("*")
    .eq("no_surat_jalan", sjSelect.value);

  if (data.length > 0) {
    namaPos.textContent = data[0].nama_pos;
  }

  data.forEach(row => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${row.sku}</td>
      <td>${row.nama_varian}</td>
      <td>${row.qty_plan}</td>
      <td>
        <input type="number" value="${row.qty_pick ?? ''}">
      </td>
    `;

    tableBody.appendChild(tr);
  });

});

console.log("Supabase test start");

const test = await supabase.from("picking").select("*");
console.log(test);

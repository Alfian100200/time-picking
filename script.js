// 1. KONEKSI SUPABASE
const supabaseUrl = "https://rbprbhmzgnusugavfkav.supabase.co";
const supabaseKey = "sb_publishable_R7r9sY6csHPpjN7D0OUZVA_NzQEru2o";
const supabase = supabasejs.createClient(supabaseUrl, supabaseKey);

// 2. ELEMEN HTML
const sjSelect = document.getElementById("sjSelect");
const namaPos = document.getElementById("namaPos");
const tableBody = document.getElementById("tableBody");

// 3. LOAD DROPDOWN NO SURAT JALAN
console.log("Script loaded");
async function loadSuratJalan() {
  const { data, error } = await supabase
    .from("picking")
    .select("no_surat_jalan");

  if (error) {
    console.error(error);
    return;
  }

  const uniqueSJ = [...new Set(data.map(d => d.no_surat_jalan))];

  uniqueSJ.forEach(sj => {
    const opt = document.createElement("option");
    opt.value = sj;
    opt.textContent = sj;
    sjSelect.appendChild(opt);
  });
}

loadSuratJalan();



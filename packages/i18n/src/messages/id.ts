import type { Messages } from './en'

/**
 * Indonesian UI string catalog. Typed as `Messages` (the English shape), so any
 * missing or misspelled key fails typechecking.
 */
export const id: Messages = {
  experiencePosition: {
    history: 'Riwayat karier',
    context:
      'Tambah jabatan baru di perusahaan tersimpan. Perubahan dan jabatan yang ada tetap dipertahankan.',
    historyError: 'Gagal memuat riwayat karier.',
    present: 'Sekarang',
    add: 'Tambah jabatan',
    dirty: 'Simpan perubahan perusahaan atau grup masa kerja sebelum menambah jabatan.',
    company: 'Perusahaan tersimpan',
    employment: 'Masa kerja',
    same: 'Masa kerja yang sama',
    newStint: 'Masa kerja baru',
    sameHelp: 'Lanjutkan masa kerja ini. Grup bersama dibuat hanya saat disimpan jika diperlukan.',
    newHelp:
      'Kembali setelah keluar? Buat masa kerja terpisah. Jabatan yang ada tetap di grup semula.',
    title: 'Jabatan',
    location: 'Lokasi',
    type: 'Jenis pekerjaan',
    start: 'Tanggal mulai',
    end: 'Tanggal selesai',
    current: 'Masih bekerja dalam jabatan ini',
    description: 'Deskripsi',
    achievements: 'Pencapaian (satu per baris)',
    skills: 'Keahlian (satu per baris)',
    status: 'Status',
    cancel: 'Batal',
    saving: 'Menyimpan�',
    save: 'Simpan jabatan baru',
  },
  nav: {
    about: 'Tentang',
    experience: 'Pengalaman',
    projects: 'Proyek',
    stack: 'Teknologi',
    certs: 'Sertifikat',
    contact: 'Kontak',
    resume: 'Resume ↗',
    menu: 'Menu',
    openMenu: 'Buka menu',
    theme: 'Tema',
    language: 'Bahasa',
  },

  availability: {
    unavailable: 'Tidak tersedia',
    available: 'Terbuka untuk bekerja',
    freelance: 'Terbuka untuk freelance',
    limited: 'Ketersediaan terbatas',
  },

  experienceType: {
    internship: 'Magang',
    'full-time': 'Penuh Waktu',
    freelance: 'Freelance',
    'part-time': 'Paruh Waktu',
    contract: 'Kontrak',
    temporary: 'Sementara',
    volunteer: 'Sukarelawan',
  },

  experienceGroup: {
    label: 'Grup masa kerja (metadata penulis, opsional)',
    help: 'Kelompokkan posisi hanya jika berada dalam satu masa kerja berkelanjutan. Jika kembali ke perusahaan yang sama, buat grup terpisah. Pilih Tanpa grup untuk melepas posisi tanpa menghapusnya.',
    none: 'Tanpa grup',
    newLabel: 'Label grup baru',
    placeholder: 'mis. Masa kerja pertama - 2020-2022',
    create: 'Buat dan pilih grup',
    mismatch: 'Grup ini milik perusahaan lain. Ganti atau lepaskan grup sebelum menyimpan.',
    loadError: 'Grup masa kerja tidak dapat dimuat. Silakan coba lagi.',
    retry: 'Coba lagi',
  },

  experienceCard: {
    present: 'Sekarang',
    yearShort: 'thn',
    yearShortPlural: 'thn',
    monthShort: 'bln',
    monthShortPlural: 'bln',
    lessThanMonth: '< 1 bln',
  },

  home: {
    email: 'Email',
    viewProjects: 'Lihat Proyek',
    contact: 'Kontak',
    experienceHeading: 'PENGALAMAN KERJA',
    projectsHeading: 'PROYEK',
    viewAllProjects: 'Lihat semua proyek',
    stackHeading: 'TEKNOLOGI',
    certificatesHeading: 'SERTIFIKAT',
    viewAllCertificates: 'Lihat semua sertifikat',
    contactHeading: 'KONTAK',
    contactTitle: 'Mari bekerja sama.',
    contactBody:
      'Saya terbuka untuk pekerjaan freelance, posisi penuh waktu, dan proyek sampingan yang menarik. Jika Anda punya ide, jangan ragu untuk menghubungi saya.',
    sendEmail: 'Kirim email ke saya',
    empty: {
      experienceTitle: 'Belum ada pengalaman',
      experienceDesc: 'Sepertinya belum ada pengalaman untuk ditampilkan saat ini.',
      projectsTitle: 'Belum ada proyek',
      projectsDesc: 'Sepertinya belum ada proyek untuk ditampilkan saat ini.',
      stackTitle: 'Belum ada teknologi',
      stackDesc: 'Sepertinya belum ada teknologi untuk ditampilkan saat ini.',
      certificatesTitle: 'Belum ada sertifikat',
      certificatesDesc: 'Sepertinya belum ada sertifikat untuk ditampilkan saat ini.',
    },
    seoTitleFallback: 'Portofolio',
  },

  footer: {
    github: 'Github',
    linkedin: 'LinkedIn',
    email: 'Email',
  },

  projects: {
    allHeading: 'SEMUA PROYEK',
    showLess: 'Tampilkan lebih sedikit',
    showMore: '+{count} lainnya',
    seoTitle: 'Proyek',
    seoDescription: 'Kumpulan proyek yang telah saya buat.',
  },

  projectDetail: {
    allProjects: 'Semua Proyek',
    about: 'Tentang',
    gallery: 'Galeri',
    notFoundTitle: 'Proyek tidak ditemukan',
    notFoundBody: 'Proyek yang Anda cari tidak ada atau mungkin telah dihapus.',
    viewsLabel: '{count} tayangan',
    seoTitleFallback: 'Proyek',
    linkGithub: 'GitHub',
    linkLive: 'Live',
    linkPlayStore: 'Play Store',
    linkAppStore: 'App Store',
  },

  certificateCard: {
    viewCertificate: 'Lihat Sertifikat',
  },

  certificates: {
    allHeading: 'SEMUA SERTIFIKAT',
    seoTitle: 'Sertifikat',
    seoDescription: 'Sertifikasi dan kredensial yang telah saya peroleh.',
  },

  resume: {
    heading: 'RESUME',
    lastUpdated: 'Terakhir diperbarui',
    downloadPdf: 'Unduh PDF',
    openPdf: 'Buka PDF',
    pdfNotOnMobile: 'Pratinjau PDF tidak tersedia di peramban seluler.',
    noResume: 'Belum ada resume yang tersedia.',
    pdfTitle: 'Resume PDF',
    seoTitle: 'Resume',
    seoDescription: 'Lihat dan unduh resume / CV saya.',
  },
}

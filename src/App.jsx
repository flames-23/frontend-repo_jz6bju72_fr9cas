import React, { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 } })
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } }
}

function Badge({ children, color = 'from-fuchsia-500 to-indigo-500' }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-20% 0px' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${color} px-4 py-1.5 text-white text-sm shadow-lg shadow-black/10`}
    >
      {children}
    </motion.span>
  )
}

function Stat({ icon, label, value }) {
  return (
    <motion.div className="flex items-center gap-2 text-sm text-slate-300" variants={fadeInUp}>
      <span className="text-lg">{icon}</span>
      <span className="text-slate-400">{label}:</span>
      <span className="font-semibold text-white">{value}</span>
    </motion.div>
  )
}

function PlanCard({ title, subtitle, emoji, price, features = [], highlight = false, ribbon, accent = 'from-indigo-500/20 to-sky-500/20', border = 'border-indigo-400/30', i = 0 }) {
  return (
    <motion.div
      custom={i}
      variants={fadeInUp}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.995 }}
      className={`group relative rounded-2xl border ${border} bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:bg-white/10 hover:shadow-2xl hover:shadow-indigo-500/20`}
    >
      {/* Glow */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b ${accent}`} />

      {ribbon && (
        <motion.div
          initial={{ rotate: 6, y: -8, opacity: 0 }}
          animate={{ rotate: 3, y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18 }}
          className="absolute -right-2 -top-2 rounded-md bg-gradient-to-r from-amber-500 to-pink-500 px-3 py-1 text-xs font-bold text-white shadow-lg"
        >
          {ribbon}
        </motion.div>
      )}

      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ rotate: -8, scale: 0.9, opacity: 0 }}
              whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              className="text-3xl"
            >
              {emoji}
            </motion.div>
            <div>
              <h3 className="text-lg font-bold tracking-tight text-white">{title}</h3>
              {subtitle && <p className="text-xs text-slate-300">{subtitle}</p>}
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-widest text-slate-400">Harga</p>
            <p className="text-xl font-extrabold text-white">{price}</p>
          </div>
        </div>

        <motion.div className="mt-4 grid grid-cols-1 gap-2" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          {features.map((f, idx) => (
            <Stat key={idx} icon={f.icon} label={f.label} value={f.value} />
          ))}
        </motion.div>

        {highlight && (
          <div className="mt-5">
            <Badge color="from-violet-500 to-fuchsia-500">Best Value</Badge>
          </div>
        )}
      </div>
    </motion.div>
  )
}

function Section({ title, tag, description, children }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10">
      <motion.div className="mb-6 flex items-end justify-between gap-4" variants={fadeInUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <div>
          <div className="mb-3">
            <Badge>{tag}</Badge>
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">{title}</h2>
          {description && <p className="mt-2 text-slate-300">{description}</p>}
        </div>
      </motion.div>
      {children}
    </section>
  )
}

export default function App() {
  const amdVLE = useMemo(() => ([
    {
      title: '📱 OVH VPS AMD VLE',
      subtitle: '🧩 BISA PERPANJANG',
      price: 'IDR 125.000 (125K)',
      emoji: '🌀',
      ribbon: 'Starter',
      features: [
        { icon: '🚩', label: 'Root Access', value: 'Yes' },
        { icon: '💝', label: 'IP Public', value: '1' },
        { icon: '👻', label: 'CPU', value: '2' },
        { icon: '🧶', label: 'RAM', value: '2 GB' },
        { icon: '🦴', label: 'Storage', value: '40 GB NVMe' },
        { icon: '👈', label: 'Bandwidth', value: '500 Mbit/s' },
        { icon: '🧶', label: 'Location', value: 'SG · AU · CA · UK' },
      ],
    },
    {
      title: '🎈 OVH VPS AMD VLE',
      subtitle: '🧩 BISA PERPANJANG',
      price: 'IDR 225.000 (225K)',
      emoji: '⚡️',
      ribbon: 'Popular',
      features: [
        { icon: '🎈', label: 'Root Access', value: 'Yes' },
        { icon: '🎶', label: 'IP Public', value: '1' },
        { icon: '👈', label: 'CPU', value: '4' },
        { icon: '💝', label: 'RAM', value: '4 GB' },
        { icon: '🔥', label: 'Storage', value: '80 GB NVMe' },
        { icon: '🍄', label: 'Bandwidth', value: '1 Gbit/s' },
        { icon: '🎏', label: 'Location', value: 'SG · AU · CA · UK' },
      ],
      highlight: true,
    },
    {
      title: '🔜 OVH VPS AMD VLE',
      subtitle: '🧩 BISA PERPANJANG',
      price: 'IDR 950.000 (950K)',
      emoji: '🚀',
      ribbon: 'Pro',
      features: [
        { icon: '🔜', label: 'Root Access', value: 'Yes' },
        { icon: '🚩', label: 'IP Public', value: '1' },
        { icon: '🎁', label: 'CPU', value: '16' },
        { icon: '🏡', label: 'RAM', value: '16 GB' },
        { icon: '✅', label: 'Storage', value: '160 GB NVMe' },
        { icon: '🖥', label: 'Bandwidth', value: '1 Gbit/s' },
        { icon: '💝', label: 'Location', value: 'SG · AU · CA · UK' },
      ],
    },
  ]), [])

  const intelOVH = useMemo(() => ([
    {
      title: '📱 VPS OVH INTEL',
      subtitle: 'Root Access',
      price: 'IDR 150.000 (150K)',
      emoji: '💠',
      features: [
        { icon: '🏡', label: 'Root Access', value: 'Yes' },
        { icon: '🐸', label: 'IP Public', value: '1' },
        { icon: '🧶', label: 'CPU', value: '1' },
        { icon: '🫦', label: 'RAM', value: '2 GB' },
        { icon: '👎', label: 'Storage', value: '40 GB NVMe' },
        { icon: '💃', label: 'Bandwidth', value: '250 Mbit/s' },
        { icon: '😂', label: 'Location', value: 'SG · AU · CA · UK' },
      ],
    },
    {
      title: '🕯 VPS OVH INTEL',
      subtitle: 'Root Access',
      price: 'IDR 300.000 (300K)',
      emoji: '💠',
      features: [
        { icon: '🕯', label: 'Root Access', value: 'Yes' },
        { icon: '🌈', label: 'IP Public', value: '1' },
        { icon: '💍', label: 'CPU', value: '2' },
        { icon: '😱', label: 'RAM', value: '4 GB' },
        { icon: '🧶', label: 'Storage', value: '80 GB NVMe' },
        { icon: '❤️', label: 'Bandwidth', value: '500 Mbit/s' },
        { icon: '🎏', label: 'Location', value: 'SG · AU · CA · UK' },
      ],
    },
    {
      title: '🪦 VPS OVH INTEL',
      subtitle: 'Root Access',
      price: 'IDR 550.000 (550K)',
      emoji: '💠',
      features: [
        { icon: '🪦', label: 'Root Access', value: 'Yes' },
        { icon: '💎', label: 'IP Public', value: '1' },
        { icon: '🔜', label: 'CPU', value: '4' },
        { icon: '🦋', label: 'RAM', value: '8 GB' },
        { icon: '🌈', label: 'Storage', value: '160 GB NVMe' },
        { icon: '🎶', label: 'Bandwidth', value: '1 Gbit/s' },
        { icon: '🎈', label: 'Location', value: 'SG · AU · CA · UK' },
      ],
    },
  ]), [])

  const vultr = useMemo(() => ([
    {
      title: '☁️ VULTR VPS',
      subtitle: '😂 BISA PERPANJANG',
      price: 'IDR 125.000 (125K)',
      emoji: '☁️',
      ribbon: 'Budget',
      features: [
        { icon: '💐', label: 'IP Public', value: '1' },
        { icon: '❓', label: 'Root Access', value: 'Yes' },
        { icon: '🪟', label: 'vCPU', value: '1' },
        { icon: '👻', label: 'RAM', value: '1 GB' },
        { icon: '🤡', label: 'Storage', value: '25 GB NVMe' },
        { icon: '🔜', label: 'Bandwidth', value: '1.00 TB' },
      ],
    },
    {
      title: '☁️ VULTR VPS',
      subtitle: '😂 BISA PERPANJANG',
      price: 'IDR 225.000 (225K)',
      emoji: '☁️',
      features: [
        { icon: '💐', label: 'IP Public', value: '1' },
        { icon: '✨', label: 'Root Access', value: 'Yes' },
        { icon: '👎', label: 'vCPU', value: '1' },
        { icon: '🍽', label: 'RAM', value: '2 GB' },
        { icon: '💐', label: 'Storage', value: '55 GB NVMe' },
        { icon: '🤡', label: 'Bandwidth', value: '2.00 TB' },
      ],
      highlight: true,
    },
    {
      title: '☁️ VULTR VPS',
      subtitle: '😂 BISA PERPANJANG',
      price: 'IDR 425.000 (425K)',
      emoji: '☁️',
      features: [
        { icon: '🫦', label: 'IP Public', value: '1' },
        { icon: '⛸', label: 'Root Access', value: 'Yes' },
        { icon: '🤡', label: 'vCPU', value: '2' },
        { icon: '💌', label: 'RAM', value: '4 GB' },
        { icon: '💎', label: 'Storage', value: '80 GB NVMe' },
        { icon: '🍃', label: 'Bandwidth', value: '3.00 TB' },
      ],
    },
    {
      title: '☁️ VULTR VPS',
      subtitle: '😂 BISA PERPANJANG',
      price: 'IDR 825.000 (825K)',
      emoji: '☁️',
      features: [
        { icon: '🦋', label: 'IP Public', value: '1' },
        { icon: '💃', label: 'Root Access', value: 'Yes' },
        { icon: '💎', label: 'vCPU', value: '4' },
        { icon: '🔼', label: 'RAM', value: '8 GB' },
        { icon: '👻', label: 'Storage', value: '160 GB NVMe' },
        { icon: '☠️', label: 'Bandwidth', value: '4.00 TB' },
      ],
    },
    {
      title: '☁️ VULTR VPS',
      subtitle: '😂 BISA PERPANJANG',
      price: 'IDR 1.900.000 (1900K)',
      emoji: '☁️',
      features: [
        { icon: '🔖', label: 'IP Public', value: '1' },
        { icon: '🚩', label: 'Root Access', value: 'Yes' },
        { icon: '🕯', label: 'vCPU', value: '6' },
        { icon: '🧶', label: 'RAM', value: '16 GB' },
        { icon: '🦋', label: 'Storage', value: '320 GB NVMe' },
        { icon: '☠️', label: 'Bandwidth', value: '5.00 TB' },
      ],
    },
  ]), [])

  const linode = useMemo(() => ([
    {
      title: '☁️ VPS LINODE',
      subtitle: '🆒 BUSA PERPANJANG',
      price: 'IDR 125.000 (125K)',
      emoji: '🟩',
      features: [
        { icon: '🥂', label: 'Public IP', value: '1' },
        { icon: '💀', label: 'Access Root', value: 'Yes' },
        { icon: '🗿', label: 'CPU', value: '1' },
        { icon: '⭐️', label: 'RAM', value: '1 GB' },
        { icon: '🎄', label: 'Storage', value: '25 GB SSD' },
        { icon: '🥸', label: 'Bandwidth', value: '1 TB' },
      ],
    },
    {
      title: '☁️ VPS LINODE',
      subtitle: '🆒 BUSA PERPANJANG',
      price: 'IDR 245.000 (245K)',
      emoji: '🟩',
      features: [
        { icon: '😥', label: 'Public IP', value: '1' },
        { icon: '🚗', label: 'Access Root', value: 'Yes' },
        { icon: '🕷', label: 'CPU', value: '1' },
        { icon: '🥸', label: 'RAM', value: '2 GB' },
        { icon: '👍', label: 'Storage', value: '50 GB SSD' },
        { icon: '🫐', label: 'Bandwidth', value: '2 TB' },
      ],
      highlight: true,
    },
    {
      title: '☁️ VPS LINODE',
      subtitle: '🆒 BUSA PERPANJANG',
      price: 'IDR 500.000 (500K)',
      emoji: '🟩',
      features: [
        { icon: '🍾', label: 'Public IP', value: '1' },
        { icon: '📍', label: 'Access Root', value: 'Yes' },
        { icon: '👍', label: 'CPU', value: '2' },
        { icon: '🪩', label: 'RAM', value: '4 GB' },
        { icon: '💀', label: 'Storage', value: '80 GB SSD' },
        { icon: '🪩', label: 'Bandwidth', value: '4 TB' },
      ],
    },
    {
      title: '☁️ VPS LINODE',
      subtitle: '🆒 BUSA PERPANJANG',
      price: 'IDR 1.000.000 (1 JUTA)',
      emoji: '🟩',
      features: [
        { icon: '🦄', label: 'IP Public', value: '1' },
        { icon: '🔍', label: 'Access Root', value: 'Yes' },
        { icon: '💎', label: 'CPU', value: '4' },
        { icon: '🔄', label: 'RAM', value: '8 GB' },
        { icon: '🌈', label: 'Storage', value: '160 GB SSD' },
        { icon: '🙂', label: 'Bandwidth', value: '5 TB' },
      ],
    },
  ]), [])

  const kvmSatuan = useMemo(() => ([
    {
      title: '📱 VPS SATUAN KVM',
      subtitle: '👍 6 MONTH ACTIVATE · 🙊 BISA PERPANJANG',
      price: 'IDR 215.000',
      emoji: '🧩',
      features: [
        { icon: '😑', label: 'RAM', value: '2 GB' },
        { icon: '😤', label: 'vCPU', value: '1' },
        { icon: '🤔', label: 'Storage', value: '25 GB SSD' },
        { icon: '😇', label: 'Bandwidth', value: '1 TB' },
      ],
    },
    {
      title: '📱 VPS SATUAN KVM',
      subtitle: '👍 6 MONTH ACTIVATE · 🙊 BISA PERPANJANG',
      price: 'IDR 350.000',
      emoji: '🧩',
      features: [
        { icon: '🌹', label: 'RAM', value: '4 GB' },
        { icon: '🖼', label: 'vCPU', value: '1' },
        { icon: '🎯', label: 'Storage', value: '50 GB SSD' },
        { icon: '⚡️', label: 'Bandwidth', value: '2 TB' },
      ],
      highlight: true,
    },
    {
      title: '📱 VPS SATUAN KVM',
      subtitle: '👍 6 MONTH ACTIVATE · 🙊 BISA PERPANJANG',
      price: 'IDR 650.000',
      emoji: '🧩',
      features: [
        { icon: '⚡️', label: 'RAM', value: '8 GB' },
        { icon: '🗺', label: 'vCPU', value: '2' },
        { icon: '💬', label: 'Storage', value: '75 GB SSD' },
        { icon: '⭐', label: 'Bandwidth', value: '4 TB' },
      ],
    },
    {
      title: '📱 VPS SATUAN KVM',
      subtitle: '👍 6 MONTH ACTIVATE · 🙊 BISA PERPANJANG',
      price: 'IDR 1.500.000',
      emoji: '🧩',
      features: [
        { icon: '💬', label: 'RAM', value: '16 GB' },
        { icon: '🛍', label: 'vCPU', value: '4' },
        { icon: '🪣', label: 'Storage', value: '125 GB SSD' },
        { icon: '🪙', label: 'Bandwidth', value: '6 TB' },
      ],
    },
  ]), [])

  const kvmPaket = useMemo(() => ([
    {
      title: '🛒 PAKET KVM SERVER',
      subtitle: 'BISA PERPANJANG · Dedicated IPv6 · NVMe Storage',
      price: 'IDR 215.000 (215K)',
      emoji: '📦',
      ribbon: '5 VPS',
      features: [
        { icon: '🪙', label: 'Total RAM', value: '10 GB' },
        { icon: '🐳', label: 'Total vCPU', value: '5' },
        { icon: '🛍', label: 'Total Storage', value: '125 GB SSD' },
        { icon: '📤', label: 'Bandwidth', value: '5 TB' },
      ],
    },
    {
      title: '🛒 PAKET KVM SERVER',
      subtitle: 'BISA PERPANJANG · Dedicated IPv6 · NVMe Storage',
      price: 'IDR 350.000 (350K)',
      emoji: '📦',
      ribbon: '10 VPS',
      features: [
        { icon: '🏦', label: 'Total RAM', value: '20 GB' },
        { icon: '📥', label: 'Total vCPU', value: '10' },
        { icon: '🐻', label: 'Total Storage', value: '250 GB SSD' },
        { icon: '📊', label: 'Bandwidth', value: '10 TB' },
      ],
      highlight: true,
    },
    {
      title: '🛒 PAKET KVM SERVER',
      subtitle: 'BISA PERPANJANG · Dedicated IPv6 · NVMe Storage',
      price: 'IDR 500.000 (500K)',
      emoji: '📦',
      ribbon: '15 VPS',
      features: [
        { icon: '👏', label: 'Total RAM', value: '30 GB' },
        { icon: '🔝', label: 'Total vCPU', value: '15' },
        { icon: '🔫', label: 'Total Storage', value: '375 GB SSD' },
        { icon: '💊', label: 'Bandwidth', value: '15 TB' },
      ],
    },
  ]), [])

  const sellingVps = useMemo(() => ([
    { price: 'Rp 25.000 (30 DAY)', spec: '1 CPU · 1 GB RAM · 15 GB SSD' },
    { price: 'Rp 35.000 (30 DAY)', spec: '1 CPU · 2 GB RAM · 20 GB SSD' },
    { price: 'Rp 60.000 (30 DAY)', spec: '2 CPU · 4 GB RAM · 50 GB SSD' },
    { price: 'Rp 120.000 (30 DAY)', spec: '4 CPU · 8 GB RAM · 100 GB SSD' },
    { price: 'Rp 225.000 (30 DAY)', spec: '8 CPU · 16 GB RAM · 200 GB SSD' },
    { price: 'Rp 450.000 (30 DAY)', spec: '16 CPU · 32 GB RAM · 400 GB SSD' },
  ]), [])

  const chrStock = useMemo(() => ([
    { region: 'Singapore · Equinix SG1', spec: '2 GB RAM · 15 GB SSD · 2 Cores · 1 IPv4 · 200 Mbps Unmetered', price: 'Rp 550.000' },
    { region: 'Indonesia · Gedung Tifa, Jakarta', spec: '2 GB RAM · 15 GB SSD · 2 Cores · 1 IPv4 · 300 Mbps Unmetered', price: 'Rp 550.000' },
  ]), [])

  return (
    <div className="min-h-screen w-full bg-slate-950 overflow-x-hidden">
      {/* Animated gradient blobs */}
      <motion.div className="pointer-events-none fixed inset-0 -z-10" initial={false}>
        <motion.div
          className="absolute left-1/2 top-[-10%] -translate-x-1/2 blur-3xl"
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 14, ease: 'easeInOut' }}
        >
          <div className="h-[600px] w-[900px] rounded-full bg-gradient-to-br from-fuchsia-500/20 via-indigo-500/20 to-sky-500/20" />
        </motion.div>
        <motion.div
          className="absolute right-0 bottom-[-10%] blur-3xl"
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 16, ease: 'easeInOut' }}
        >
          <div className="h-[500px] w-[700px] rounded-full bg-gradient-to-tr from-emerald-400/10 via-cyan-400/10 to-purple-400/10" />
        </motion.div>
      </motion.div>

      {/* Hero */}
      <header className="mx-auto w-full max-w-6xl px-4 pt-14">
        <motion.div className="flex items-center justify-between" variants={fadeInUp} initial="hidden" animate="show">
          <div className="flex items-center gap-3">
            <motion.div initial={{ rotate: -12 }} animate={{ rotate: 0 }} transition={{ type: 'spring', stiffness: 140 }} className="rounded-xl bg-white/10 p-2 text-2xl backdrop-blur">⚡️</motion.div>
            <span className="text-lg font-bold tracking-tight text-white">VPS Showcase</span>
          </div>
          <div className="hidden gap-2 sm:flex">
            <Badge color="from-emerald-500 to-teal-500">Anti DDoS IP</Badge>
            <Badge color="from-sky-500 to-blue-600">Dedicated Server</Badge>
            <Badge color="from-amber-500 to-orange-600">Bisa Perpanjang</Badge>
          </div>
        </motion.div>

        <div className="mt-10 grid items-center gap-8 md:grid-cols-2">
          <motion.div variants={fadeInUp} initial="hidden" animate="show">
            <div className="mb-4">
              <Badge color="from-indigo-600 to-fuchsia-600">Premium Cloud • Multiple Regions</Badge>
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl font-extrabold leading-tight tracking-tight text-white md:text-6xl"
            >
              Temukan VPS Terbaik<br />Untuk Kebutuhanmu
            </motion.h1>
            <motion.p className="mt-4 max-w-xl text-lg text-slate-300" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }}>
              Pilih dari jajaran paket OVH, VULTR, LINODE, hingga KVM. Semua dengan performa tinggi, jaringan cepat, dan harga bersahabat.
            </motion.p>
            <motion.div className="mt-6 flex flex-wrap gap-3" variants={stagger} initial="hidden" animate="show">
              <motion.a href="#recommend" className="rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-5 py-3 text-white shadow-lg shadow-fuchsia-600/20 transition hover:scale-[1.02]" variants={fadeInUp}>Rekomendasi Saya</motion.a>
              <motion.a href="#plans" className="rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-white backdrop-blur transition hover:bg-white/10" variants={fadeInUp}>Lihat Paket</motion.a>
            </motion.div>
          </motion.div>
          <motion.div className="relative" initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <motion.div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-tr from-fuchsia-500/20 via-sky-500/20 to-emerald-400/20 blur-2xl" animate={{ opacity: [0.6, 0.9, 0.6] }} transition={{ repeat: Infinity, duration: 6 }} />
            <div className="rounded-3xl border border-white/20 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
              <motion.div className="grid grid-cols-2 gap-4" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
                <motion.div variants={fadeInUp} whileHover={{ y: -4 }} className="rounded-2xl border border-indigo-400/30 bg-gradient-to-b from-indigo-500/10 to-sky-500/10 p-4 text-white">
                  <div className="text-2xl">🚀</div>
                  <p className="mt-2 text-sm text-slate-200">NVMe Storage</p>
                  <p className="text-xl font-extrabold">Up to 160 GB</p>
                </motion.div>
                <motion.div variants={fadeInUp} whileHover={{ y: -4 }} className="rounded-2xl border border-fuchsia-400/30 bg-gradient-to-b from-fuchsia-500/10 to-pink-500/10 p-4 text-white">
                  <div className="text-2xl">🧠</div>
                  <p className="mt-2 text-sm text-slate-200">vCPU</p>
                  <p className="text-xl font-extrabold">Up to 16</p>
                </motion.div>
                <motion.div variants={fadeInUp} whileHover={{ y: -4 }} className="rounded-2xl border border-emerald-400/30 bg-gradient-to-b from-emerald-500/10 to-teal-500/10 p-4 text-white">
                  <div className="text-2xl">⚡</div>
                  <p className="mt-2 text-sm text-slate-200">Bandwidth</p>
                  <p className="text-xl font-extrabold">Up to 5 TB</p>
                </motion.div>
                <motion.div variants={fadeInUp} whileHover={{ y: -4 }} className="rounded-2xl border border-amber-400/30 bg-gradient-to-b from-amber-500/10 to-orange-500/10 p-4 text-white">
                  <div className="text-2xl">🌍</div>
                  <p className="mt-2 text-sm text-slate-200">Region</p>
                  <p className="text-xl font-extrabold">SG • AU • CA • UK</p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Plans */}
      <div id="plans" />
      <Section title="OVH VPS AMD VLE" tag="Performa Ryzen" description="Keseimbangan performa dan harga. Cocok untuk website, bot, dan microservices.">
        <motion.div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          {amdVLE.map((p, i) => (
            <PlanCard key={i} {...p} i={i} accent="from-violet-500/20 to-fuchsia-500/20" border="border-violet-400/30" />
          ))}
        </motion.div>
        <motion.p className="mt-4 text-slate-300" variants={fadeInUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          Pilihan region banyak.
        </motion.p>
      </Section>

      <Section title="VPS OVH INTEL" tag="Stabil & Andal" description="Platform Intel dengan opsi resource fleksibel.">
        <motion.div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          {intelOVH.map((p, i) => (
            <PlanCard key={i} {...p} i={i} accent="from-sky-500/20 to-blue-500/20" border="border-sky-400/30" />
          ))}
        </motion.div>
      </Section>

      <Section title="VULTR VPS" tag="Jaringan Global" description="Harga kompetitif, bandwidth besar, performa konsisten.">
        <motion.div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          {vultr.map((p, i) => (
            <PlanCard key={i} {...p} i={i} accent="from-cyan-500/20 to-emerald-500/20" border="border-cyan-400/30" />
          ))}
        </motion.div>
        <motion.p className="mt-4 text-slate-300" variants={fadeInUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          Pilihan region banyak.
        </motion.p>
      </Section>

      <Section title="LINODE VPS" tag="Network Kencang" description="SSD cepat, bandwidth melimpah, cocok untuk aplikasi produksi ringan.">
        <motion.div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          {linode.map((p, i) => (
            <PlanCard key={i} {...p} i={i} accent="from-emerald-500/20 to-teal-500/20" border="border-emerald-400/30" />
          ))}
        </motion.div>
      </Section>

      <Section title="VPS SATUAN KVM" tag="Fleksibel" description="Aktif 6 bulan, bisa diperpanjang. Ideal untuk eksperimen atau workload sementara.">
        <motion.div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          {kvmSatuan.map((p, i) => (
            <PlanCard key={i} {...p} i={i} accent="from-amber-500/20 to-pink-500/20" border="border-amber-400/30" />
          ))}
        </motion.div>
      </Section>

      <Section title="PAKET KVM SERVER" tag="Hemat Skala" description="Paket gabungan, resource bisa dibagi sesuai kebutuhan.">
        <motion.div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          {kvmPaket.map((p, i) => (
            <PlanCard key={i} {...p} i={i} accent="from-fuchsia-500/20 to-rose-500/20" border="border-fuchsia-400/30" />
          ))}
        </motion.div>
        <motion.div className="mt-4 rounded-xl border border-white/15 bg-white/5 p-4 text-slate-200" variants={fadeInUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          Paket KVM adalah kumpulan resource (RAM/CPU/Storage) yang dapat dibagi menjadi beberapa VPS. Contoh: 5 VPS berbagi 10GB RAM bisa juga dijadikan 3 VPS atau 1 VPS (tergantung pembagian).
        </motion.div>
      </Section>

      <Section title="SELLING VPS" tag="Bulanan" description="Opsi bulanan fleksibel dengan range spesifikasi luas.">
        <motion.div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          {sellingVps.map((s, i) => (
            <motion.div key={i} variants={fadeInUp} whileHover={{ y: -4 }} className="rounded-2xl border border-white/15 bg-white/5 p-5 text-white backdrop-blur">
              <div className="text-sm text-slate-300">{s.spec}</div>
              <div className="mt-2 text-xl font-extrabold">{s.price}</div>
            </motion.div>
          ))}
        </motion.div>
        <motion.div className="mt-4 grid gap-3 sm:grid-cols-3" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <Badge color="from-sky-600 to-blue-600">Garansi 30 Hari</Badge>
          <Badge color="from-emerald-600 to-teal-600">Per 3 Bulan • 6 Bulan • 1 Tahun</Badge>
          <Badge color="from-indigo-600 to-fuchsia-600">Anti DDoS • Dedicated Server</Badge>
        </motion.div>
        <motion.p className="mt-3 text-sm text-slate-400" variants={fadeInUp} initial="hidden" whileInView="show" viewport={{ once: true }}>Harga dapat berubah sewaktu-waktu.</motion.p>
      </Section>

      <Section title="INFO STOK DO BIL CC" tag="Stok Khusus" description="VPS CHR Unmetered (Singapura & Indonesia)">
        <motion.div className="grid gap-6 sm:grid-cols-2" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          {chrStock.map((c, i) => (
            <motion.div key={i} variants={fadeInUp} whileHover={{ y: -4 }} className="rounded-2xl border border-white/15 bg-white/5 p-6 text-white backdrop-blur">
              <div className="text-sm text-slate-300">{c.region}</div>
              <div className="mt-2 text-slate-200">{c.spec}</div>
              <div className="mt-3 text-xl font-extrabold">{c.price}</div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Recommendation */}
      <section id="recommend" className="mx-auto w-full max-w-6xl px-4 py-12">
        <motion.div className="rounded-3xl border border-indigo-400/30 bg-gradient-to-b from-indigo-600/10 to-fuchsia-600/10 p-8 text-white backdrop-blur" variants={fadeInUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <div className="mb-4">
            <Badge color="from-indigo-600 to-fuchsia-600">Rekomendasi</Badge>
          </div>
          <h3 className="text-2xl font-extrabold">Mana yang terbaik?</h3>
          <p className="mt-2 text-slate-200">
            Tidak ada satu "terbaik" untuk semua. Pilihan terbaik bergantung pada kebutuhan:
          </p>
          <motion.ul className="mt-4 grid gap-3 text-slate-200 md:grid-cols-2" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.li variants={fadeInUp} className="rounded-xl border border-white/10 bg-white/5 p-4"><span className="font-semibold">Budget & pemula:</span> VULTR 1 vCPU / 1–2 GB RAM — cukup untuk website ringan, bot kecil, dan testing.</motion.li>
            <motion.li variants={fadeInUp} className="rounded-xl border border-white/10 bg-white/5 p-4"><span className="font-semibold">Keseimbangan performa:</span> OVH AMD VLE 4 vCPU / 4 GB RAM — performa solid, bandwidth besar, cocok untuk app kecil-menengah.</motion.li>
            <motion.li variants={fadeInUp} className="rounded-xl border border-white/10 bg-white/5 p-4"><span className="font-semibold">Produksi menengah:</span> LINODE 2–4 CPU / 4–8 GB RAM — jaringan kencang dan stabil untuk trafik lebih tinggi.</motion.li>
            <motion.li variants={fadeInUp} className="rounded-xl border border-white/10 bg-white/5 p-4"><span className="font-semibold">Kinerja maksimal:</span> OVH AMD VLE 16 CPU / 16 GB RAM — untuk workload berat, game server kecil, atau banyak container.</motion.li>
          </motion.ul>
          <p className="mt-4 text-sm text-slate-300">Pilih region terdekat dengan pengguna (SG/ AU/ CA/ UK) untuk latency terbaik.</p>
        </motion.div>
      </section>

      {/* Footer / Contact */}
      <footer className="mx-auto w-full max-w-6xl px-4 pb-16">
        <motion.div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white backdrop-blur" variants={fadeInUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h4 className="text-xl font-extrabold">Tertarik membeli?</h4>
              <p className="mt-1 text-slate-300">Kontak untuk pembelian, paket custom, atau pertanyaan lainnya.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} href="#" className="rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-2.5 text-white shadow-lg shadow-emerald-600/20">Chat WhatsApp</motion.a>
              <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} href="#" className="rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-white">Telegram</motion.a>
            </div>
          </div>
          <div className="mt-4 text-xs text-slate-400">
            Garansi 30 hari selama VPS aktif dan tidak abuse. Harga dapat berubah sewaktu-waktu.
          </div>
        </motion.div>
      </footer>
    </div>
  )
}

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  Unlock,
  LogOut,
  Plus,
  Edit3,
  Trash2,
  Eye,
  Save,
  X,
  FileText,
  Calendar,
  Clock,
  Tag,
  Sparkles,
  Link as LinkIcon,
  ChevronLeft,
  AlertTriangle,
  Loader2,
  CheckCircle,
  HelpCircle
} from "lucide-react";
import Link from "next/link";
import {
  loginAdmin,
  logoutAdmin,
  checkIsAdmin,
  getBlogPosts,
  saveBlogPost,
  deleteBlogPost,
} from "@/app/actions/blog";
import { blocksToMarkdown, BlogPost } from "@/lib/blogUtils";

export default function AdminDashboardPage() {
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Data states
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);

  // Editor modal states
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    category: "",
    readTime: "5 min read",
    date: "",
    contentMarkdown: ""
  });
  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isSlugLocked, setIsSlugLocked] = useState(true);

  // Delete modal states
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Toast / status alerts
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Help Panel
  const [showHelp, setShowHelp] = useState(false);

  // 1. Initial Authentication Check
  useEffect(() => {
    async function initAuth() {
      const isAuth = await checkIsAdmin();
      setIsAuthenticated(isAuth);
      if (isAuth) {
        fetchPosts();
      }
    }
    initAuth();
  }, []);

  // 2. Fetch Blog Posts
  async function fetchPosts() {
    setIsLoadingPosts(true);
    try {
      const allPosts = await getBlogPosts();
      setPosts(allPosts);
    } catch (err) {
      triggerAlert("error", "Failed to load blog posts.");
    } finally {
      setIsLoadingPosts(false);
    }
  }

  // 3. Helper to trigger alert toaster
  function triggerAlert(type: "success" | "error", message: string) {
    setAlert({ type, message });
    setTimeout(() => {
      setAlert(null);
    }, 4000);
  }

  // 4. Handle Login Submit
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!password.trim()) {
      setAuthError("Password is required.");
      return;
    }

    setIsLoggingIn(true);
    setAuthError("");

    try {
      const res = await loginAdmin(password);
      if (res.success) {
        setIsAuthenticated(true);
        triggerAlert("success", "Successfully logged in!");
        fetchPosts();
      } else {
        setAuthError(res.message);
      }
    } catch (err) {
      setAuthError("A connection error occurred. Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  }

  // 5. Handle Logout
  async function handleLogout() {
    try {
      await logoutAdmin();
      setIsAuthenticated(false);
      setPassword("");
      setPosts([]);
      triggerAlert("success", "Logged out successfully.");
    } catch (err) {
      triggerAlert("error", "Logout failed.");
    }
  }

  // 6. Generate Slug from Title
  function generateSlug(text: string) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters except spaces and hyphens
      .replace(/[\s_]+/g, "-") // Replace spaces/underscores with single hyphens
      .replace(/^-+|-+$/g, ""); // Trim starting/trailing hyphens
  }

  // 7. Watch title input to auto-generate slug if unlocked
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const titleVal = e.target.value;
    setFormData((prev) => {
      const updated = { ...prev, title: titleVal };
      if (!editingPostId && isSlugLocked) {
        updated.slug = generateSlug(titleVal);
      }
      return updated;
    });
  };

  // 8. Open Editor Modal (Create or Edit mode)
  function openEditor(post: BlogPost | null = null) {
    setFormErrors({});
    if (post) {
      // Edit mode
      setEditingPostId(post.id);
      setIsSlugLocked(true);
      setFormData({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        category: post.category,
        readTime: post.readTime,
        date: post.date,
        contentMarkdown: blocksToMarkdown(post.content)
      });
    } else {
      // Create mode
      setEditingPostId(null);
      setIsSlugLocked(true);
      const currentDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      }); // e.g. "May 31, 2026"
      
      setFormData({
        title: "",
        slug: "",
        excerpt: "",
        category: "",
        readTime: "5 min read",
        date: currentDate,
        contentMarkdown: ""
      });
    }
    setIsEditorOpen(true);
  }

  // 9. Save Post Submit Handler
  async function handleSavePost(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    setFormErrors({});

    try {
      const res = await saveBlogPost(editingPostId, formData);
      if (res.success) {
        triggerAlert("success", res.message);
        setIsEditorOpen(false);
        fetchPosts();
      } else {
        triggerAlert("error", res.message);
        if (res.errors) {
          setFormErrors(res.errors);
        }
      }
    } catch (err) {
      triggerAlert("error", "Failed to save post. Please check your data.");
    } finally {
      setIsSaving(false);
    }
  }

  // 10. Delete Post Confirmation Handler
  async function handleDeleteConfirm() {
    if (!deleteConfirmId) return;
    setIsDeleting(true);

    try {
      const res = await deleteBlogPost(deleteConfirmId);
      if (res.success) {
        triggerAlert("success", res.message);
        setDeleteConfirmId(null);
        fetchPosts();
      } else {
        triggerAlert("error", res.message);
      }
    } catch (err) {
      triggerAlert("error", "Failed to delete post.");
    } finally {
      setIsDeleting(false);
    }
  }

  // Loading Initial Auth state
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center px-6">
        <div className="w-12 h-12 rounded-full border-2 border-accent/25 border-t-accent animate-spin mb-4" />
        <p className="text-foreground-muted text-sm font-semibold tracking-wide">Initializing Portfolio Admin...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 relative bg-background overflow-hidden bg-grid">
      {/* Background blobs matching the general aesthetic */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-[350px] h-[350px] bg-accent/10 rounded-full blur-[80px] -z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

      {/* Floating Status Notification / Toast */}
      <AnimatePresence>
        {alert && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 p-4 rounded-xl flex items-center gap-3 shadow-2xl backdrop-blur-md border ${
              alert.type === "success"
                ? "bg-emerald-950/80 border-emerald-500/30 text-emerald-300"
                : "bg-rose-950/80 border-rose-500/30 text-rose-300"
            }`}
          >
            {alert.type === "success" ? <CheckCircle size={18} /> : <AlertTriangle size={18} />}
            <span className="text-xs sm:text-sm font-bold tracking-wide">{alert.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[var(--max-width)] mx-auto relative z-10">
        {/* ======================================================== */}
        {/* UNAUTHENTICATED STATE: LOGIN WINDOW                      */}
        {/* ======================================================== */}
        {!isAuthenticated ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto"
          >
            {/* Back button */}
            <div className="mb-6">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-bold text-foreground-muted hover:text-foreground transition-colors group cursor-pointer"
              >
                <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                Back to Blog
              </Link>
            </div>

            {/* Login Glass Card */}
            <div className="glass-card p-8 rounded-2xl border border-card-border/80 shadow-2xl relative overflow-hidden bg-card-bg/40">
              <div className="text-center mb-8">
                <div className="w-12 h-12 rounded-2xl bg-accent/20 border border-accent/30 flex items-center justify-center mx-auto mb-4 text-accent animate-pulse-glow">
                  <Lock size={22} />
                </div>
                <h2 className="text-xl font-black tracking-tight mb-2">Credential Protection</h2>
                <p className="text-foreground-muted text-xs font-semibold leading-relaxed">
                  Enter the administrative access token to manage your portfolio blog posts.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-[11px] font-black uppercase text-foreground-muted tracking-wider mb-2">
                    Access Code / Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-black/25 dark:bg-white/[0.02] border border-card-border/70 focus:border-accent rounded-xl py-3 px-4 text-sm font-semibold outline-none transition-all placeholder:text-foreground-muted/30 text-center"
                    autoFocus
                  />
                  {authError && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-rose-400 text-xs font-bold mt-2 text-center"
                    >
                      {authError}
                    </motion.p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full py-3 bg-accent hover:bg-accent-hover disabled:bg-accent/40 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer shadow-lg shadow-accent/25 hover:shadow-accent/40 flex items-center justify-center gap-2 active:scale-[0.98]"
                >
                  {isLoggingIn ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Verifying...
                    </>
                  ) : (
                    <>
                      Unlock Dashboard <Unlock size={14} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        ) : (
          /* ======================================================== */
          /* AUTHENTICATED STATE: DASHBOARD VIEW                      */
          /* ======================================================== */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header row */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pb-6 border-b border-card-border/40">
              <div>
                <div className="flex items-center gap-2 text-xs font-black uppercase text-accent tracking-widest mb-1.5">
                  <Sparkles size={14} /> Creator Dashboard
                </div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight leading-none">
                  Blog <span className="gradient-text">Studio</span>
                </h1>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 items-center w-full sm:w-auto">
                <button
                  onClick={() => setShowHelp(!showHelp)}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white/[0.03] hover:bg-white/[0.06] border border-card-border/60 text-foreground rounded-xl text-xs font-bold transition-all cursor-pointer outline-none"
                >
                  <HelpCircle size={14} className="text-accent" /> Write Guide
                </button>

                <button
                  onClick={() => openEditor()}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-accent text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer outline-none hover:bg-accent-hover shadow-md shadow-accent/15 hover:shadow-accent/25"
                >
                  <Plus size={14} /> Write Post
                </button>

                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 rounded-xl text-xs font-bold transition-all cursor-pointer outline-none"
                >
                  <LogOut size={14} /> Sign Out
                </button>
              </div>
            </div>

            {/* Markdown Quick Guide Panel */}
            <AnimatePresence>
              {showHelp && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden mb-8"
                >
                  <div className="glass-card p-6 border-dashed border-accent/30 bg-accent/5 rounded-2xl">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-sm font-black flex items-center gap-2">
                        <Sparkles size={16} className="text-accent" /> Markdown Writing Guide
                      </h3>
                      <button
                        onClick={() => setShowHelp(false)}
                        className="text-foreground-muted hover:text-foreground cursor-pointer"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <p className="text-xs text-foreground-muted mb-4 font-semibold leading-relaxed">
                      Write your blog post in clean, standard Markdown inside the content area. Our custom engine automatically compiles your markdown text into structured content blocks so that it fits the portfolio's stunning design framework!
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="bg-black/20 p-3.5 rounded-xl border border-card-border/50 text-[11px] font-medium leading-relaxed">
                        <p className="text-accent font-extrabold uppercase mb-1">HEADINGS</p>
                        <code className="text-emerald-400/90 font-mono">## Heading Title</code>
                        <p className="text-foreground-muted mt-1">Converts to a stylish blue-purple section header.</p>
                      </div>
                      <div className="bg-black/20 p-3.5 rounded-xl border border-card-border/50 text-[11px] font-medium leading-relaxed">
                        <p className="text-accent font-extrabold uppercase mb-1">UNORDERED LISTS</p>
                        <code className="text-emerald-400/90 font-mono">- First item<br />- Second item</code>
                        <p className="text-foreground-muted mt-1">Renders glowing bullet items with pulse micro-animations.</p>
                      </div>
                      <div className="bg-black/20 p-3.5 rounded-xl border border-card-border/50 text-[11px] font-medium leading-relaxed">
                        <p className="text-accent font-extrabold uppercase mb-1">BLOCKQUOTES & AUTHORS</p>
                        <code className="text-emerald-400/90 font-mono">&gt; Great quote text here<br />&gt; — Author Name</code>
                        <p className="text-foreground-muted mt-1">Embeds an elegant large-quote layout, showing Author Name at the bottom.</p>
                      </div>
                      <div className="bg-black/20 p-3.5 rounded-xl border border-card-border/50 text-[11px] font-medium leading-relaxed">
                        <p className="text-accent font-extrabold uppercase mb-1">CODE BLOCKS</p>
                        <code className="text-emerald-400/90 font-mono">```javascript<br />const test = 100;<br />```</code>
                        <p className="text-foreground-muted mt-1">Generates an interactive card with a syntax highlighter and copy-code trigger.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main Blog Post Manager Content */}
            <div className="glass-card overflow-hidden bg-card-bg/25 shadow-lg rounded-2xl border border-card-border/50">
              {isLoadingPosts ? (
                /* Skeleton Loader */
                <div className="p-10 text-center flex flex-col items-center justify-center">
                  <Loader2 size={32} className="animate-spin text-accent mb-4" />
                  <p className="text-foreground-muted text-xs font-semibold">Retrieving your portfolio articles...</p>
                </div>
              ) : posts.length === 0 ? (
                /* Empty state */
                <div className="py-20 px-6 text-center max-w-md mx-auto">
                  <div className="w-16 h-16 rounded-2xl bg-white/[0.02] border border-card-border/60 flex items-center justify-center mx-auto mb-6 text-foreground-muted">
                    <FileText size={28} />
                  </div>
                  <h3 className="text-base font-black tracking-tight mb-2">No Articles Available</h3>
                  <p className="text-foreground-muted text-xs font-semibold leading-relaxed mb-6">
                    You have successfully deleted all initial demo blog posts. Start fresh and document your growth insights, audits, or guides now!
                  </p>
                  <button
                    onClick={() => openEditor()}
                    className="px-5 py-2.5 bg-accent hover:bg-accent-hover text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer inline-flex items-center gap-2"
                  >
                    <Plus size={14} /> Write First Blog
                  </button>
                </div>
              ) : (
                /* Data List Grid */
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="border-b border-card-border/60 bg-black/20 text-[10px] uppercase font-black tracking-widest text-foreground-muted">
                        <th className="py-4 px-6">Post Details</th>
                        <th className="py-4 px-6 hidden md:table-cell">Category</th>
                        <th className="py-4 px-6 hidden sm:table-cell">Date</th>
                        <th className="py-4 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-card-border/40">
                      {posts.map((post) => (
                        <tr key={post.id} className="hover:bg-white/[0.01] transition-colors group">
                          {/* Title / Slug Column */}
                          <td className="py-4.5 px-6">
                            <div className="font-extrabold text-sm text-foreground group-hover:text-accent transition-colors leading-snug">
                              {post.title}
                            </div>
                            <div className="flex items-center gap-1.5 text-[10px] text-foreground-muted mt-1 font-semibold font-mono">
                              <LinkIcon size={10} className="text-accent/60" /> {post.slug}
                            </div>
                          </td>

                          {/* Category Column */}
                          <td className="py-4.5 px-6 hidden md:table-cell">
                            <span className="px-2.5 py-0.5 text-[9px] font-black uppercase text-accent bg-accent/15 border border-accent/20 rounded-md">
                              {post.category}
                            </span>
                          </td>

                          {/* Date Column */}
                          <td className="py-4.5 px-6 hidden sm:table-cell text-xs font-semibold text-foreground-muted">
                            <div className="flex items-center gap-1.5">
                              <Calendar size={12} className="text-accent/60" />
                              {post.date}
                            </div>
                          </td>

                          {/* Actions Column */}
                          <td className="py-4.5 px-6 text-right">
                            <div className="flex items-center justify-end gap-2.5">
                              {/* Open live post */}
                              <Link
                                href={`/blog/${post.slug}`}
                                target="_blank"
                                className="w-8.5 h-8.5 rounded-lg border border-card-border/70 hover:border-accent hover:text-accent bg-black/10 flex items-center justify-center text-foreground-muted transition-colors cursor-pointer"
                                title="View Live"
                              >
                                <Eye size={14} />
                              </Link>

                              {/* Edit post */}
                              <button
                                onClick={() => openEditor(post)}
                                className="w-8.5 h-8.5 rounded-lg border border-card-border/70 hover:border-accent hover:text-accent bg-black/10 flex items-center justify-center text-foreground-muted transition-colors cursor-pointer"
                                title="Edit Post"
                              >
                                <Edit3 size={14} />
                              </button>

                              {/* Delete post */}
                              <button
                                onClick={() => setDeleteConfirmId(post.id)}
                                className="w-8.5 h-8.5 rounded-lg border border-rose-500/20 hover:border-rose-500 hover:text-rose-400 bg-rose-500/5 flex items-center justify-center text-rose-500/60 transition-colors cursor-pointer"
                                title="Delete Post"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* ======================================================== */}
      {/* EDITOR MODAL: SLIDE-OVER OR FULLOVER FORM                 */}
      {/* ======================================================== */}
      <AnimatePresence>
        {isEditorOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm"
          >
            {/* Backdrop click closer */}
            <div className="absolute inset-0 cursor-default" onClick={() => setIsEditorOpen(false)} />

            {/* Modal Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative w-full max-w-3xl bg-background border-l border-card-border h-full flex flex-col shadow-2xl z-10"
            >
              {/* Header */}
              <div className="px-6 py-5 border-b border-card-border/60 flex items-center justify-between bg-background-secondary">
                <div>
                  <h2 className="text-base font-black tracking-tight flex items-center gap-2">
                    <FileText size={18} className="text-accent" />{" "}
                    {editingPostId ? "Edit Blog Post" : "Draft New Blog Post"}
                  </h2>
                  <p className="text-[10px] text-foreground-muted font-bold uppercase mt-0.5 tracking-wider">
                    {editingPostId ? "Updating existing records" : "Creating fresh entry"}
                  </p>
                </div>
                <button
                  onClick={() => setIsEditorOpen(false)}
                  className="w-8.5 h-8.5 rounded-lg border border-card-border/70 hover:border-accent hover:text-accent flex items-center justify-center text-foreground-muted transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Form Body scrollable */}
              <form onSubmit={handleSavePost} className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Title Field */}
                  <div className="md:col-span-2">
                    <label className="block text-[11px] font-black uppercase text-foreground-muted tracking-wider mb-2">
                      Blog Title
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. GA4 Analytics: Critical Custom Tracking Metrics"
                      value={formData.title}
                      onChange={handleTitleChange}
                      required
                      className="w-full bg-black/25 dark:bg-white/[0.02] border border-card-border/70 focus:border-accent rounded-xl py-2.5 px-4 text-sm font-semibold outline-none transition-all placeholder:text-foreground-muted/30"
                    />
                    {formErrors.title && (
                      <p className="text-rose-400 text-xs font-bold mt-1.5">{formErrors.title[0]}</p>
                    )}
                  </div>

                  {/* Slug Field with generator */}
                  <div>
                    <label className="block text-[11px] font-black uppercase text-foreground-muted tracking-wider mb-2 flex items-center justify-between">
                      URL Slug
                      <button
                        type="button"
                        onClick={() => setIsSlugLocked(!isSlugLocked)}
                        className="text-[9px] font-bold text-accent hover:text-white transition-all flex items-center gap-1 cursor-pointer outline-none"
                      >
                        {isSlugLocked ? (
                          <>
                            <Lock size={10} /> Auto-generating
                          </>
                        ) : (
                          <>
                            <Unlock size={10} /> Editable
                          </>
                        )}
                      </button>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="e.g. ga4-custom-tracking-metrics"
                        value={formData.slug}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, slug: generateSlug(e.target.value) }))
                        }
                        disabled={isSlugLocked}
                        required
                        className="w-full bg-black/25 dark:bg-white/[0.02] border border-card-border/70 focus:border-accent disabled:text-foreground-muted/65 rounded-xl py-2.5 px-4 text-sm font-semibold outline-none transition-all placeholder:text-foreground-muted/30"
                      />
                    </div>
                    {formErrors.slug && (
                      <p className="text-rose-400 text-xs font-bold mt-1.5">{formErrors.slug[0]}</p>
                    )}
                  </div>

                  {/* Category Field */}
                  <div>
                    <label className="block text-[11px] font-black uppercase text-foreground-muted tracking-wider mb-2">
                      Category
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Web Analytics, Local SEO, Technical SEO"
                      value={formData.category}
                      onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                      required
                      className="w-full bg-black/25 dark:bg-white/[0.02] border border-card-border/70 focus:border-accent rounded-xl py-2.5 px-4 text-sm font-semibold outline-none transition-all placeholder:text-foreground-muted/30"
                    />
                    {formErrors.category && (
                      <p className="text-rose-400 text-xs font-bold mt-1.5">{formErrors.category[0]}</p>
                    )}
                  </div>

                  {/* Read Time Field */}
                  <div>
                    <label className="block text-[11px] font-black uppercase text-foreground-muted tracking-wider mb-2">
                      Read Time
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 5 min read"
                      value={formData.readTime}
                      onChange={(e) => setFormData((prev) => ({ ...prev, readTime: e.target.value }))}
                      required
                      className="w-full bg-black/25 dark:bg-white/[0.02] border border-card-border/70 focus:border-accent rounded-xl py-2.5 px-4 text-sm font-semibold outline-none transition-all placeholder:text-foreground-muted/30"
                    />
                    {formErrors.readTime && (
                      <p className="text-rose-400 text-xs font-bold mt-1.5">{formErrors.readTime[0]}</p>
                    )}
                  </div>

                  {/* Date Field */}
                  <div>
                    <label className="block text-[11px] font-black uppercase text-foreground-muted tracking-wider mb-2">
                      Publish Date
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. May 31, 2026"
                      value={formData.date}
                      onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                      required
                      className="w-full bg-black/25 dark:bg-white/[0.02] border border-card-border/70 focus:border-accent rounded-xl py-2.5 px-4 text-sm font-semibold outline-none transition-all placeholder:text-foreground-muted/30"
                    />
                    {formErrors.date && (
                      <p className="text-rose-400 text-xs font-bold mt-1.5">{formErrors.date[0]}</p>
                    )}
                  </div>

                  {/* Excerpt Field */}
                  <div className="md:col-span-2">
                    <label className="block text-[11px] font-black uppercase text-foreground-muted tracking-wider mb-2">
                      Excerpt / Snippet
                    </label>
                    <textarea
                      placeholder="Brief one-to-two sentence description summarizing the article. Renders beautifully on grids."
                      value={formData.excerpt}
                      onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
                      required
                      rows={2}
                      className="w-full bg-black/25 dark:bg-white/[0.02] border border-card-border/70 focus:border-accent rounded-xl py-2.5 px-4 text-sm font-semibold outline-none transition-all placeholder:text-foreground-muted/30 resize-y"
                    />
                    {formErrors.excerpt && (
                      <p className="text-rose-400 text-xs font-bold mt-1.5">{formErrors.excerpt[0]}</p>
                    )}
                  </div>

                  {/* Markdown Content Area */}
                  <div className="md:col-span-2">
                    <label className="block text-[11px] font-black uppercase text-foreground-muted tracking-wider mb-2 flex items-center justify-between">
                      Markdown Body Content
                      <span className="text-[10px] text-accent font-bold">Standard GFM Markdown Supported</span>
                    </label>
                    <textarea
                      placeholder="## Use heading 2 for section headers&#10;&#10;Write paragraphs naturally. Consecutives lines form the same paragraph.&#10;&#10;- Bullet lists look excellent.&#10;- They represent structured ideas.&#10;&#10;> Blockquotes represent bold insights&#10;> — Author Credit&#10;&#10;```javascript&#10;// Code snippets show premium editors&#10;const x = 'Attribution SEO';&#10;```"
                      value={formData.contentMarkdown}
                      onChange={(e) => setFormData((prev) => ({ ...prev, contentMarkdown: e.target.value }))}
                      required
                      rows={14}
                      className="w-full bg-black/25 dark:bg-white/[0.02] border border-card-border/70 focus:border-accent rounded-xl py-3 px-4 text-sm font-mono text-emerald-400/90 leading-relaxed outline-none transition-all placeholder:text-foreground-muted/20 resize-y"
                    />
                    {formErrors.contentMarkdown && (
                      <p className="text-rose-400 text-xs font-bold mt-1.5">{formErrors.contentMarkdown[0]}</p>
                    )}
                  </div>
                </div>

                {/* Footer Save Button */}
                <div className="pt-4 border-t border-card-border flex items-center justify-end gap-3 bg-background">
                  <button
                    type="button"
                    onClick={() => setIsEditorOpen(false)}
                    className="px-4 py-2.5 bg-white/[0.03] hover:bg-white/[0.06] border border-card-border/60 text-foreground rounded-xl text-xs font-bold transition-all cursor-pointer outline-none"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-hover disabled:bg-accent/40 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer outline-none shadow-md shadow-accent/15"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 size={14} className="animate-spin" /> Saving...
                      </>
                    ) : (
                      <>
                        <Save size={14} /> Publish Post
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================================================== */}
      {/* DELETE CONFIRMATION MODAL                                 */}
      {/* ======================================================== */}
      <AnimatePresence>
        {deleteConfirmId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/70 backdrop-blur-sm"
          >
            <div className="absolute inset-0 cursor-default" onClick={() => setDeleteConfirmId(null)} />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-sm glass-card p-6 border border-card-border bg-background-secondary/95 shadow-2xl rounded-2xl z-10 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-4 animate-float">
                <Trash2 size={22} />
              </div>
              
              <h3 className="text-base font-black tracking-tight mb-2">Delete Article?</h3>
              <p className="text-xs text-foreground-muted font-semibold leading-relaxed mb-6">
                Are you absolutely sure you want to delete this blog post? This action is permanent and cannot be undone.
              </p>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="flex-1 py-2.5 bg-white/[0.03] hover:bg-white/[0.06] border border-card-border/60 text-foreground rounded-xl text-xs font-bold transition-all cursor-pointer outline-none"
                >
                  Keep Post
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  disabled={isDeleting}
                  className="flex-1 py-2.5 bg-rose-500 hover:bg-rose-600 disabled:bg-rose-500/40 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer outline-none shadow-md shadow-rose-500/15"
                >
                  {isDeleting ? "Deleting..." : "Delete Permanently"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

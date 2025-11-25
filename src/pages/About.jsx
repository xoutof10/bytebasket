import React from "react";

function About() {
  return (
    <div>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

          {/* ---------------------- Page Badge ---------------------- */}
          <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600 mb-6">
            <span className="h-2 w-2 rounded-full bg-red-600" />
            About ByteBasket
          </div>

          {/* ---------------------- Intro Section ---------------------- */}
          <section className="grid gap-10 md:grid-cols-2 md:items-center mb-16">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-4">
                Your trusted source for{" "}
                <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                  performance tech.
                </span>
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-5">
                ByteBasket is a curated tech ecommerce store, offering
                high-quality devices, gadgets, and accessories. We value
                performance, design, and reliability — and we only carry
                products we'd use ourselves.
              </p>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Whether you're a developer, gamer, or everyday tech user, we aim
                to make buying great tech simple and enjoyable.
              </p>
            </div>

            {/* intro card */}
            <div className="md:justify-self-end">
              <div className="relative overflow-hidden rounded-2xl bg-red-600 p-6 sm:p-8 shadow-lg text-red-50">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center rounded-full bg-red-500/40 px-4 py-2 text-xs font-medium">
                    ByteBasket · Est. 2025
                  </div>
                </div>

                <p className="text-sm sm:text-base mb-6">
                  “We built ByteBasket for people who love tech, compare specs,
                  and expect honest quality.”
                </p>

                <div className="flex items-center justify-between text-xs text-red-100">
                  <div>
                    <p className="font-medium text-white">Fast dispatch</p>
                    <p>48-hour shipping on most items</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-white">Curated catalog</p>
                    <p>Only tech worth buying</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ---------------------- Stats Section ---------------------- */}
          <section className="grid gap-4 sm:grid-cols-3 mb-16">
            <div className="rounded-xl border border-red-200 bg-white px-4 py-5">
              <p className="text-xs font-medium uppercase tracking-wide text-red-600">
                Products tested
              </p>
              <p className="mt-2 text-2xl font-semibold">1,200+</p>
              <p className="mt-1 text-xs text-slate-500">
                Carefully reviewed before listing
              </p>
            </div>

            <div className="rounded-xl border border-red-200 bg-white px-4 py-5">
              <p className="text-xs font-medium uppercase tracking-wide text-red-600">
                Avg. rating
              </p>
              <p className="mt-2 text-2xl font-semibold">4.8/5</p>
              <p className="mt-1 text-xs text-slate-500">
                Based on verified reviews
              </p>
            </div>

            <div className="rounded-xl border border-red-200 bg-white px-4 py-5">
              <p className="text-xs font-medium uppercase tracking-wide text-red-600">
                Support response
              </p>
              <p className="mt-2 text-2xl font-semibold">&lt; 2h</p>
              <p className="mt-1 text-xs text-slate-500">
                Fast, friendly tech support
              </p>
            </div>
          </section>

          {/* ---------------------- Why Shop With Us ---------------------- */}
          <section className="grid gap-10 md:grid-cols-2 mb-16">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight mb-3">
                Why shop with ByteBasket?
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                We carefully select every product and prioritize transparency,
                quality, and a smooth buying experience.
              </p>
            </div>

            <div className="space-y-4 text-sm sm:text-base">
              <div className="flex gap-3">
                <span className="mt-1 text-lg">❤️</span>
                <div>
                  <p className="font-medium text-slate-900">Honest specs</p>
                  <p className="text-slate-600 text-sm">
                    Clear product information without marketing fluff.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="mt-1 text-lg">🚚</span>
                <div>
                  <p className="font-medium text-slate-900">Fast shipping</p>
                  <p className="text-slate-600 text-sm">
                    Quick delivery with reliable tracking.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="mt-1 text-lg">💬</span>
                <div>
                  <p className="font-medium text-slate-900">Human support</p>
                  <p className="text-slate-600 text-sm">
                    Tech-savvy support from real people.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ---------------------- Values Section ---------------------- */}
          <section className="border-t border-red-200 pt-10">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight mb-4">
              Our values
            </h2>

            <div className="grid gap-6 sm:grid-cols-3 text-sm sm:text-base">
              <div>
                <p className="font-medium text-slate-900 mb-1">
                  Curated, not crowded
                </p>
                <p className="text-slate-600">
                  Quality-focused catalog instead of endless listings.
                </p>
              </div>

              <div>
                <p className="font-medium text-slate-900 mb-1">
                  Privacy-first
                </p>
                <p className="text-slate-600">
                  Minimal tracking and transparent data practices.
                </p>
              </div>

              <div>
                <p className="font-medium text-slate-900 mb-1">
                  Built for enthusiasts
                </p>
                <p className="text-slate-600">
                  Designed with tech lovers and power users in mind.
                </p>
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}

export default About;

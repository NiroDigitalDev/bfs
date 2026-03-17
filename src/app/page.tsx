import { Reveal } from "@/components/reveal";

export default function Home() {
  return (
    <>
      {/* Navigation */}
      <nav className="fixed w-full top-0 p-4 md:p-6 flex justify-between items-center z-50 mix-blend-difference">
        <div className="text-xl md:text-2xl font-black tracking-[-0.04em] uppercase">
          BFS.
        </div>
        <div className="hidden md:flex gap-8 text-sm font-bold tracking-wide uppercase">
          <a
            href="#supplies"
            className="hover:opacity-50 transition-opacity"
          >
            Supplies
          </a>
          <a
            href="#manifesto"
            className="hover:opacity-50 transition-opacity"
          >
            Manifesto
          </a>
          <a href="#cult" className="hover:opacity-50 transition-opacity">
            The Cult
          </a>
          <a href="#faq" className="hover:opacity-50 transition-opacity">
            FAQ
          </a>
        </div>
        <button className="px-5 py-2 md:px-6 md:py-2 border border-white rounded-full text-xs md:text-sm font-bold uppercase hover:bg-white hover:text-black transition-colors">
          Cart (0)
        </button>
      </nav>

      {/* Hero Section */}
      <header className="min-h-[90vh] flex flex-col justify-center px-4 md:px-12 relative overflow-hidden pt-20">
        <div className="z-10 mt-10 md:mt-20">
          <Reveal>
            <h1 className="text-[18vw] md:text-[12vw] lg:text-[10vw] leading-[0.85] font-black tracking-[-0.08em] uppercase">
              Dark
              <br />
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "2px white" }}
              >
                Matter.
              </span>
            </h1>
          </Reveal>
          <Reveal delay="0.2s">
            <p className="max-w-2xl mt-8 md:mt-12 text-lg md:text-2xl lg:text-3xl font-medium tracking-tight text-zinc-400">
              You wanted a white canvas? You&apos;re on the wrong website. We
              sell pitch-black paper, obsidian notebooks, and the absolute
              absence of legible margins.
            </p>
          </Reveal>
          <Reveal delay="0.4s" className="mt-12 md:mt-16">
            <a
              href="#supplies"
              className="inline-block bg-white text-black px-8 py-4 md:px-10 md:py-5 rounded-full font-black text-sm md:text-base uppercase tracking-wider hover:scale-105 transition-transform"
            >
              Shop The Void
            </a>
          </Reveal>
        </div>

        {/* Abstract background element */}
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] md:w-[800px] md:h-[800px] bg-gradient-to-b from-zinc-900 to-black rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/3" />
      </header>

      {/* Marquee */}
      <Reveal>
        <div className="w-full overflow-hidden border-y border-zinc-800 py-3 md:py-4 bg-black">
          <div className="marquee-content text-3xl md:text-5xl lg:text-7xl font-black tracking-[-0.04em] uppercase text-zinc-800">
            BLACK PAPER &nbsp; &bull; &nbsp; NO WHITE SPACE &nbsp; &bull;
            &nbsp; OBSIDIAN NOTEBOOKS &nbsp; &bull; &nbsp; 500GSM VOID &nbsp;
            &bull; &nbsp; BLACK PAPER &nbsp; &bull; &nbsp; NO WHITE SPACE
            &nbsp; &bull; &nbsp; OBSIDIAN NOTEBOOKS &nbsp; &bull; &nbsp;
            500GSM VOID &nbsp; &bull; &nbsp;{" "}
          </div>
        </div>
      </Reveal>

      {/* Products Section */}
      <section id="supplies" className="py-24 md:py-40 px-4 md:px-12">
        <Reveal>
          <div className="flex flex-col lg:flex-row justify-between lg:items-end mb-16 md:mb-20">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-[-0.04em] uppercase leading-none mb-6 lg:mb-0">
              Stationery
              <br />
              Non Grata.
            </h2>
            <p className="text-zinc-500 text-base md:text-lg max-w-sm lg:text-right pb-2">
              Curated emptiness for the discerning creative. Normal pens will
              not save you here.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Product 1: The Notebook */}
          <Reveal>
            <div className="group cursor-pointer product-card">
              <div className="w-full aspect-[3/4] bg-[#0a0a0a] rounded-r-lg notebook-edge relative flex items-center justify-center overflow-hidden border-y border-r border-zinc-800 border-l-[6px] border-l-black">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white font-bold tracking-widest uppercase z-10 bg-black/50 px-6 py-3 backdrop-blur-sm rounded-full">
                  Add to Cart
                </span>
              </div>
              <div className="mt-6 flex justify-between items-start">
                <div className="pr-4">
                  <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight">
                    The Void Book (A5)
                  </h3>
                  <p className="text-zinc-500 mt-2 text-sm leading-relaxed">
                    200 pages of pure, light-absorbing black. Bound in matte
                    faux-leather. Unlined, because rules are for white paper.
                  </p>
                  <p className="text-xs font-mono text-zinc-600 mt-2">
                    120GSM / LAY-FLAT BINDING
                  </p>
                </div>
                <span className="text-lg md:text-xl font-medium">$34.00</span>
              </div>
            </div>
          </Reveal>

          {/* Product 2: Cardstock */}
          <Reveal delay="0.1s">
            <div className="group cursor-pointer product-card">
              <div className="w-full aspect-[3/4] bg-[#111] cardstock-edge relative flex items-center justify-center overflow-hidden border border-zinc-800 shadow-2xl">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white font-bold tracking-widest uppercase z-10 bg-black/50 px-6 py-3 backdrop-blur-sm rounded-full">
                  Add to Cart
                </span>
              </div>
              <div className="mt-6 flex justify-between items-start">
                <div className="pr-4">
                  <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight">
                    Abyssal Cardstock
                  </h3>
                  <p className="text-zinc-500 mt-2 text-sm leading-relaxed">
                    50 sheets of aggressively thick black card. Guaranteed to
                    jam standard office printers and intimidate clients.
                  </p>
                  <p className="text-xs font-mono text-zinc-600 mt-2">
                    500GSM / A4 SIZE
                  </p>
                </div>
                <span className="text-lg md:text-xl font-medium">$45.00</span>
              </div>
            </div>
          </Reveal>

          {/* Product 3: Sketchpad */}
          <Reveal delay="0.2s">
            <div className="group cursor-pointer product-card">
              <div className="w-full aspect-[3/4] bg-[#151515] relative flex items-center justify-center overflow-hidden border border-zinc-800 rounded-sm">
                <div className="sketch-coil" />
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white font-bold tracking-widest uppercase z-10 bg-black/50 px-6 py-3 backdrop-blur-sm rounded-full">
                  Add to Cart
                </span>
              </div>
              <div className="mt-6 flex justify-between items-start">
                <div className="pr-4">
                  <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight">
                    Event Horizon Pad
                  </h3>
                  <p className="text-zinc-500 mt-2 text-sm leading-relaxed">
                    Top-wire bound sketchpad. Tooth-heavy texture perfect for
                    pastels, white charcoal, and existential dread.
                  </p>
                  <p className="text-xs font-mono text-zinc-600 mt-2">
                    160GSM / COIL BOUND
                  </p>
                </div>
                <span className="text-lg md:text-xl font-medium">$28.00</span>
              </div>
            </div>
          </Reveal>

          {/* Product 4: Sticky Notes */}
          <Reveal>
            <div className="group cursor-pointer product-card">
              <div className="w-full aspect-square bg-[#1a1a1a] shadow-[-5px_5px_15px_rgba(0,0,0,0.8)] relative flex items-center justify-center overflow-hidden border-t border-r border-zinc-800 mt-12 md:mt-0">
                <div className="absolute bottom-0 left-0 w-full h-[5px] bg-zinc-900" />
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white font-bold tracking-widest uppercase z-10 bg-black/50 px-6 py-3 backdrop-blur-sm rounded-full">
                  Add to Cart
                </span>
              </div>
              <div className="mt-6 flex justify-between items-start">
                <div className="pr-4">
                  <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight">
                    Sticky Voids (3-Pack)
                  </h3>
                  <p className="text-zinc-500 mt-2 text-sm leading-relaxed">
                    Leave passive-aggressive notes that your roommates can
                    barely read. 3 pads of 100 sheets.
                  </p>
                  <p className="text-xs font-mono text-zinc-600 mt-2">
                    3x3 INCHES / HIGH TACK
                  </p>
                </div>
                <span className="text-lg md:text-xl font-medium">$15.00</span>
              </div>
            </div>
          </Reveal>

          {/* Product 5: The Pen */}
          <Reveal delay="0.1s">
            <div className="group cursor-pointer product-card">
              <div className="w-full aspect-square bg-zinc-950 flex items-center justify-center overflow-hidden border border-zinc-900 relative">
                {/* Pen graphic */}
                <div className="w-[80%] h-3 bg-gradient-to-r from-zinc-700 via-white to-zinc-400 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)] -rotate-45" />
                <span className="absolute opacity-0 group-hover:opacity-100 transition-opacity text-white font-bold tracking-widest uppercase z-10 bg-black/50 px-6 py-3 backdrop-blur-sm rounded-full">
                  Add to Cart
                </span>
              </div>
              <div className="mt-6 flex justify-between items-start">
                <div className="pr-4">
                  <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight">
                    The Savior Pen
                  </h3>
                  <p className="text-zinc-500 mt-2 text-sm leading-relaxed">
                    Opaque, liquid silver gel ink. Because standard blue ink on
                    our paper makes you look foolish.
                  </p>
                  <p className="text-xs font-mono text-zinc-600 mt-2">
                    0.5MM / SILVER GEL
                  </p>
                </div>
                <span className="text-lg md:text-xl font-medium">$12.00</span>
              </div>
            </div>
          </Reveal>

          {/* Product 6: The Planner */}
          <Reveal delay="0.2s">
            <div className="group cursor-pointer product-card">
              <div className="w-full aspect-[3/4] bg-[#050505] rounded-lg relative flex items-center justify-center overflow-hidden border border-zinc-800 shadow-2xl">
                <div className="absolute top-0 right-8 w-4 h-[80%] bg-red-900 shadow-lg" />
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white font-bold tracking-widest uppercase z-10 bg-black/50 px-6 py-3 backdrop-blur-sm rounded-full">
                  Add to Cart
                </span>
              </div>
              <div className="mt-6 flex justify-between items-start">
                <div className="pr-4">
                  <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight">
                    Executive Despair
                  </h3>
                  <p className="text-zinc-500 mt-2 text-sm leading-relaxed">
                    An undated weekly planner printed with 90% black ink on 100%
                    black paper. For scheduling crises.
                  </p>
                  <p className="text-xs font-mono text-zinc-600 mt-2">
                    UNDATED / SILK RIBBON
                  </p>
                </div>
                <span className="text-lg md:text-xl font-medium">$42.00</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Survival Guide */}
      <section className="py-24 md:py-40 px-4 md:px-12 bg-black border-t border-zinc-900">
        <Reveal>
          <div className="flex flex-col lg:flex-row justify-between lg:items-end mb-16 md:mb-20">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-[-0.04em] uppercase leading-none mb-6 lg:mb-0">
              Survival
              <br />
              Guide.
            </h2>
            <p className="text-zinc-500 text-base md:text-lg max-w-sm lg:text-right pb-2">
              You bought black paper. Now what. Here&apos;s how to not waste
              your extremely specific purchase.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <Reveal>
            <div className="border border-zinc-800 p-8 md:p-10 relative group hover:border-zinc-600 transition-colors">
              <div className="text-[8rem] md:text-[10rem] font-black text-zinc-900 leading-none absolute -top-6 -left-2 select-none group-hover:text-zinc-800 transition-colors">
                1
              </div>
              <div className="relative z-10 pt-20">
                <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight mb-4">
                  Abandon Normal Ink
                </h3>
                <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
                  Your trusty Bic will betray you here. You need opaque ink:
                  silver gel, gold metallic, or white correction-pen energy.
                  Think of it as upgrading from tap water to champagne, except
                  it&apos;s a pen.
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay="0.15s">
            <div className="border border-zinc-800 p-8 md:p-10 relative group hover:border-zinc-600 transition-colors">
              <div className="text-[8rem] md:text-[10rem] font-black text-zinc-900 leading-none absolute -top-6 -left-2 select-none group-hover:text-zinc-800 transition-colors">
                2
              </div>
              <div className="relative z-10 pt-20">
                <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight mb-4">
                  Let the Paper Dry
                </h3>
                <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
                  Gel ink on dark paper takes 4&ndash;6 seconds longer to dry
                  than you&apos;re used to. Impatient people will smudge
                  everything and blame us. We accept no liability for your
                  lack of impulse control.
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay="0.3s">
            <div className="border border-zinc-800 p-8 md:p-10 relative group hover:border-zinc-600 transition-colors">
              <div className="text-[8rem] md:text-[10rem] font-black text-zinc-900 leading-none absolute -top-6 -left-2 select-none group-hover:text-zinc-800 transition-colors">
                3
              </div>
              <div className="relative z-10 pt-20">
                <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight mb-4">
                  Accept the Stares
                </h3>
                <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
                  People will look at you differently. Your barista will
                  comment. Your coworkers will have questions. You will have no
                  good answers. This is the price of aesthetic conviction.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Philosophy / Manifesto */}
      <section
        id="manifesto"
        className="py-24 md:py-40 bg-zinc-950 text-white border-y border-zinc-900"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <Reveal>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-[-0.04em] uppercase mb-16 md:mb-24 leading-none">
              The Void
              <br />
              Manifesto.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            <Reveal>
              <div className="text-5xl md:text-6xl font-black text-zinc-800 mb-6">
                01
              </div>
              <h4 className="text-xl md:text-2xl font-bold uppercase mb-4">
                Anti-Legibility
              </h4>
              <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
                Keep your secrets entirely safe. If you accidentally write in a
                standard ballpoint pen, literally nobody will be able to read
                it. Not even you.
              </p>
            </Reveal>
            <Reveal delay="0.2s">
              <div className="text-5xl md:text-6xl font-black text-zinc-800 mb-6">
                02
              </div>
              <h4 className="text-xl md:text-2xl font-bold uppercase mb-4">
                Aesthetic Dominance
              </h4>
              <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
                Pull out a solid black notebook in your next corporate meeting.
                Watch the color drain from the faces of your colleagues who
                brought yellow legal pads.
              </p>
            </Reveal>
            <Reveal delay="0.4s">
              <div className="text-5xl md:text-6xl font-black text-zinc-800 mb-6">
                03
              </div>
              <h4 className="text-xl md:text-2xl font-bold uppercase mb-4">
                High Contrast Only
              </h4>
              <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
                Our paper forces commitment. You must use silver, gold, or
                opaque white ink. It turns every grocery list into an arcane,
                important document.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* As Seen Nowhere */}
      <section className="py-16 md:py-24 px-4 md:px-12 bg-black border-t border-zinc-900">
        <Reveal>
          <p className="text-center text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-zinc-600 mb-12 md:mb-16">
            As Featured In Publications That Definitely Exist
          </p>
        </Reveal>
        <Reveal delay="0.2s">
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 md:gap-x-20 max-w-5xl mx-auto">
            {[
              "The Dark Arts Quarterly",
              "Ink & Suffering",
              "Vantablack Vogue",
              "Nihilist Stationer",
              "Pen World*",
            ].map((pub) => (
              <span
                key={pub}
                className="text-lg md:text-2xl font-black uppercase tracking-[-0.04em] text-zinc-800 hover:text-zinc-500 transition-colors cursor-default"
              >
                {pub}
              </span>
            ))}
          </div>
        </Reveal>
        <Reveal delay="0.3s">
          <p className="text-center text-[10px] text-zinc-700 mt-10">
            *Pen World did not actually feature us. They said our paper
            &ldquo;actively resists journalism.&rdquo; We consider this a
            review.
          </p>
        </Reveal>
      </section>

      {/* Testimonials */}
      <section id="cult" className="py-24 md:py-40 px-4 md:px-12 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-[-0.04em] uppercase mb-16 md:mb-24">
              Words from the Cult
            </h2>
          </Reveal>

          <div className="space-y-20 md:space-y-32">
            <Reveal>
              <blockquote className="relative px-6">
                <span className="absolute -top-6 -left-2 md:-top-10 md:-left-10 text-7xl md:text-9xl text-zinc-800 font-serif leading-none">
                  &ldquo;
                </span>
                <p className="text-xl md:text-3xl lg:text-4xl font-medium leading-tight mb-8 relative z-10 text-zinc-200">
                  I wrote my thesis in The Void Book using a white gel pen. My
                  professor said it was &lsquo;hostile to read&rsquo; but gave
                  me an A for branding.
                </p>
                <footer className="text-zinc-500 font-bold uppercase tracking-wider text-xs md:text-sm">
                  — Edgar A., Grad Student
                </footer>
              </blockquote>
            </Reveal>

            <Reveal>
              <blockquote className="relative px-6">
                <span className="absolute -top-6 -left-2 md:-top-10 md:-left-10 text-7xl md:text-9xl text-zinc-800 font-serif leading-none">
                  &ldquo;
                </span>
                <p className="text-xl md:text-3xl lg:text-4xl font-medium leading-tight mb-8 relative z-10 text-zinc-200">
                  When I typed in the URL, I was sweating. When I saw they just
                  sold very pretentious notebooks, I was relieved. Five stars.
                </p>
                <footer className="text-zinc-500 font-bold uppercase tracking-wider text-xs md:text-sm">
                  — Sarah T., Accidental Typist
                </footer>
              </blockquote>
            </Reveal>

            <Reveal>
              <blockquote className="relative px-6">
                <span className="absolute -top-6 -left-2 md:-top-10 md:-left-10 text-7xl md:text-9xl text-zinc-800 font-serif leading-none">
                  &ldquo;
                </span>
                <p className="text-xl md:text-3xl lg:text-4xl font-medium leading-tight mb-8 relative z-10 text-zinc-200">
                  I bought the Abyssal Cardstock to print business cards. The
                  printer caught fire. The cards look incredible though. Would
                  absolutely do it again.
                </p>
                <footer className="text-zinc-500 font-bold uppercase tracking-wider text-xs md:text-sm">
                  — Marcus D., Graphic Designer &amp; Arsonist
                </footer>
              </blockquote>
            </Reveal>

            <Reveal>
              <blockquote className="relative px-6">
                <span className="absolute -top-6 -left-2 md:-top-10 md:-left-10 text-7xl md:text-9xl text-zinc-800 font-serif leading-none">
                  &ldquo;
                </span>
                <p className="text-xl md:text-3xl lg:text-4xl font-medium leading-tight mb-8 relative z-10 text-zinc-200">
                  My therapist asked me to keep a journal. She did not specify
                  it had to be readable. The Void Book is technically
                  compliance.
                </p>
                <footer className="text-zinc-500 font-bold uppercase tracking-wider text-xs md:text-sm">
                  — Naomi K., Malicious Compliance Enthusiast
                </footer>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 md:py-40 px-4 md:px-12 bg-zinc-950 border-y border-zinc-900">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-[-0.04em] uppercase mb-16 md:mb-24 leading-none">
              Frequently
              <br />
              Questioned.
            </h2>
          </Reveal>

          <div className="space-y-12 md:space-y-16">
            <Reveal>
              <div className="border-b border-zinc-800 pb-10">
                <h3 className="text-lg md:text-2xl font-bold uppercase tracking-tight mb-4">
                  Why would I buy black paper?
                </h3>
                <p className="text-zinc-400 leading-relaxed text-sm md:text-base max-w-2xl">
                  Why would you buy white paper? Because someone told you to?
                  Because society normalized it? We&apos;re not here to answer
                  your existential questions. We&apos;re here to sell you paper
                  that matches the void inside.
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div className="border-b border-zinc-800 pb-10">
                <h3 className="text-lg md:text-2xl font-bold uppercase tracking-tight mb-4">
                  Can I print on it?
                </h3>
                <p className="text-zinc-400 leading-relaxed text-sm md:text-base max-w-2xl">
                  Technically, yes. Practically, your printer will enter a
                  crisis. Standard inkjet printers assume they&apos;re printing
                  on white paper. Ours will gaslight them into producing
                  invisible output. We recommend laser printers with white
                  toner, or simply accepting handwriting as a personality trait.
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div className="border-b border-zinc-800 pb-10">
                <h3 className="text-lg md:text-2xl font-bold uppercase tracking-tight mb-4">
                  Do you ship internationally?
                </h3>
                <p className="text-zinc-400 leading-relaxed text-sm md:text-base max-w-2xl">
                  Darkness has no borders. We ship to 40+ countries. Customs
                  agents have occasionally opened our packages and been
                  confused by the contents. &ldquo;It&apos;s just... black
                  rectangles?&rdquo; Yes. That&apos;s the product. You&apos;re
                  welcome.
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div className="border-b border-zinc-800 pb-10">
                <h3 className="text-lg md:text-2xl font-bold uppercase tracking-tight mb-4">
                  Is this an art project or a real business?
                </h3>
                <p className="text-zinc-400 leading-relaxed text-sm md:text-base max-w-2xl">
                  Both. Neither. We have a tax ID and a genuine distaste for
                  white margins. Our accountant calls it &ldquo;a real
                  business.&rdquo; Our friends call it &ldquo;a cry for
                  help.&rdquo; Our customers call it &ldquo;the only stationery
                  brand that gets me.&rdquo;
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div>
                <h3 className="text-lg md:text-2xl font-bold uppercase tracking-tight mb-4">
                  What&apos;s your return policy?
                </h3>
                <p className="text-zinc-400 leading-relaxed text-sm md:text-base max-w-2xl">
                  You may return any unopened product within 30 days. If you
                  opened it and are disappointed that the black paper is, in
                  fact, black &mdash; we genuinely do not know what to tell you.
                  The name of the company is Blacks For Sale. We were not being
                  metaphorical about the stationery.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Big Footer Call to Action */}
      <footer className="pt-24 md:pt-40 pb-8 md:pb-12 px-4 md:px-12 bg-black flex flex-col items-center justify-center text-center relative border-t border-zinc-900 overflow-hidden">
        <Reveal>
          <h2 className="text-[15vw] md:text-[12vw] leading-none font-black tracking-[-0.08em] uppercase mb-10 md:mb-12">
            FADE TO
            <br />
            BLACK.
          </h2>
        </Reveal>
        <Reveal>
          <button className="bg-white text-black px-10 py-5 md:px-12 md:py-6 rounded-full font-black text-lg md:text-xl uppercase tracking-widest hover:scale-110 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.2)]">
            Shop All Supplies
          </button>
        </Reveal>

        {/* THE CRUCIAL DISCLAIMER */}
        <div className="mt-24 md:mt-32 w-full max-w-5xl border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center text-[10px] md:text-xs text-zinc-600 font-medium tracking-wide gap-6 md:gap-0">
          <p className="max-w-2xl text-left leading-relaxed">
            <strong>LEGAL DISCLAIMER:</strong> Yes, we are fully aware of what
            this domain name sounds like. No, we do not sell people. We sell
            extremely dark paper, obsidian notebooks, and conceptual stationery.
            If you came to this URL looking for anything else, please
            re-evaluate your life choices and clear your search history
            immediately.
          </p>
          <div className="flex flex-wrap gap-4 uppercase font-bold text-zinc-500">
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

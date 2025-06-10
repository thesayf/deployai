import { motion } from "framer-motion";
import {
  SiNike,
  Si3M,
  SiAbstract,
  SiAdobe,
  SiAirtable,
  SiAmazon,
  SiBox,
  SiBytedance,
  SiChase,
  SiCloudbees,
  SiBurton,
  SiBmw,
  SiHeroku,
  SiBuildkite,
  SiCouchbase,
  SiDailymotion,
  SiDeliveroo,
  SiEpicgames,
  SiGenius,
  SiGodaddy,
} from "react-icons/si";

const LogoHero = () => {
  return (
    <section className="bg-white pb-12">
      <div className="flex w-full flex-col items-center px-8 py-12 md:py-20">
        <h1 className="max-w-xl text-center text-4xl font-semibold md:text-6xl">
          Deploy AI Into Your Business in 30 Days
        </h1>
        <p className="my-6 max-w-xl text-center">
          Stop paying $5K-$20K monthly for tools you don't own. Deploy custom AI
          solutions that eliminate recurring fees and automate your biggest
          challenges.
        </p>
        <button className="bg-indigo-600 px-8 py-2 text-base font-medium text-white shadow-[3px_3px_0_black] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[1px_1px_0_black] md:text-lg">
          Book Strategy Call
        </button>
      </div>

      <div className="flex  overflow-hidden">
        <TranslateWrapper>
          <LogoItemsTop />
        </TranslateWrapper>
        <TranslateWrapper>
          <LogoItemsTop />
        </TranslateWrapper>
        <TranslateWrapper>
          <LogoItemsTop />
        </TranslateWrapper>
      </div>
      <div className="mt-4 flex overflow-hidden">
        <TranslateWrapper reverse>
          <LogoItemsBottom />
        </TranslateWrapper>
        <TranslateWrapper reverse>
          <LogoItemsBottom />
        </TranslateWrapper>
        <TranslateWrapper reverse>
          <LogoItemsBottom />
        </TranslateWrapper>
      </div>
    </section>
  );
};

const TranslateWrapper = ({ children, reverse }) => {
  return (
    <motion.div
      initial={{ translateX: reverse ? "-100%" : "0%" }}
      animate={{ translateX: reverse ? "0%" : "-100%" }}
      transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      className="flex gap-4 px-2"
    >
      {children}
    </motion.div>
  );
};

const LogoItem = ({ Icon }) => {
  return (
    <a
      href="/"
      rel="nofollow"
      target="_blank"
      className="flex h-16 w-16 items-center justify-center text-black transition-colors hover:bg-slate-200 md:h-24 md:w-24"
    >
      <Icon className="text-4xl md:text-5xl" />
    </a>
  );
};

const LogoItemsTop = () => (
  <>
    <LogoItem Icon={SiNike} />
    <LogoItem Icon={Si3M} />
    <LogoItem Icon={SiAbstract} />
    <LogoItem Icon={SiAdobe} />
    <LogoItem Icon={SiAirtable} />
    <LogoItem Icon={SiAmazon} />
    <LogoItem Icon={SiBox} />
    <LogoItem Icon={SiBytedance} />
    <LogoItem Icon={SiChase} />
    <LogoItem Icon={SiCloudbees} />
  </>
);

const LogoItemsBottom = () => (
  <>
    <LogoItem Icon={SiBmw} />
    <LogoItem Icon={SiBurton} />
    <LogoItem Icon={SiBuildkite} />
    <LogoItem Icon={SiCouchbase} />
    <LogoItem Icon={SiDailymotion} />
    <LogoItem Icon={SiDeliveroo} />
    <LogoItem Icon={SiEpicgames} />
    <LogoItem Icon={SiGenius} />
    <LogoItem Icon={SiGodaddy} />
    <LogoItem Icon={SiHeroku} />
  </>
);

export default LogoHero;

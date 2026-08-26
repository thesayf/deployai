import { Seo } from "@/components/site/Seo";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { SiteLink } from "@/components/site/SiteLink";

/** Branded 404 (navy) — points lost visitors at the pages that matter. */
export default function NotFound() {
  return (
    <>
      <Seo
        title="Page not found | Deploy AI Studio"
        description="That page doesn't exist. The services catalogue and our client stories are the best places to start."
        path="/404"
      />
      <div className="site">
        <Navbar />
        <section className="bg-navy nf">
          <div className="wrap">
            <h1>
              That page doesn&rsquo;t <em>exist</em>.
            </h1>
            <p className="sub">
              The site was rebuilt recently, so an old link may have brought you
              here. These are the best places to start.
            </p>
            <div className="ctas">
              <SiteLink className="pill p-white" href="/services">
                See the services
              </SiteLink>
              <SiteLink className="tert dark" href="/">
                Go to the home page
              </SiteLink>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}

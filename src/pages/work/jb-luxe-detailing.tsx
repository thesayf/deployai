import Head from "next/head";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CaseHero } from "@/components/site/case/CaseHero";
import { CaseGlance } from "@/components/site/case/CaseGlance";
import { CaseInterlude } from "@/components/site/case/CaseInterlude";
import { CaseStory } from "@/components/site/case/CaseStory";
import { CaseProduct } from "@/components/site/case/CaseProduct";
import { CaseResults } from "@/components/site/case/CaseResults";
import { CaseQuote } from "@/components/site/case/CaseQuote";
import { CaseCTA } from "@/components/site/case/CaseCTA";
import { ChatMock } from "@/components/site/case/ChatMock";
import { CrmMock } from "@/components/site/case/CrmMock";
import { BookingMock } from "@/components/site/case/BookingMock";

export default function JbLuxeCase() {
  return (
    <>
      <Head>
        <title>
          JB Luxe Detailing: a booking assistant that never sleeps | Deploy AI
          Studio
        </title>
        <meta
          name="description"
          content="How we built a 24/7 AI booking assistant and a CRM for JB Luxe Detailing, a premium mobile detailer, and tripled its bookings."
        />
      </Head>
      <div className="site">
        <Navbar />

        <CaseHero
          title={
            <>
              Booked out, without touching the <em className="accent">phone</em>.
            </>
          }
          photo="/site/hero-jb.jpg"
          logo="/logos/jblogo.png"
          metric={{ value: "3×", label: "more bookings" }}
        />

        <CaseGlance
          vision="JB Luxe Detailing wanted to stop losing after-hours enquiries, and give every customer an instant answer, price, and booking, without hiring a receptionist."
          impact="In three weeks we shipped a 24/7 AI booking assistant and a CRM. Bookings tripled, and the average reply dropped from four hours to thirty seconds."
          services={["AI booking assistant", "Customer CRM", "Booking automation"]}
          industry="Automotive · Mobile detailing"
          tech={["React", "Node.js", "GPT-4", "Stripe", "Google Calendar", "Twilio"]}
        />

        <CaseInterlude
          tone="blue"
          heading="Can you keep up when customers won't wait?"
          label="Let's talk"
          href="/book"
        />

        <CaseStory
          image={{
            src: "/site/jb-context.jpg",
            caption: "A JB Luxe detail, on location.",
          }}
          chapters={[
            {
              head: (
                <>
                  The best detailer in the area was losing work to his own{" "}
                  <em className="accent">voicemail</em>.
                </>
              ),
              body: [
                "JB Luxe Detailing had plenty of work. Porsches on the driveway, Ferraris in the diary, a client list that runs to Premier League players, and more than 500 details behind it. Keeping up with the enquiries was the hard part.",
                "Most of them arrived after hours. Someone would admire a colleague’s paintwork at 9pm, message to ask about a full detail, and hear nothing back until morning. By then they had booked someone else. Six in ten out-of-hours enquiries went unanswered, and almost every one was a few hundred pounds of work lost.",
                "Quotes were scattered across text messages, and the diary was a paper notebook. Customers who came back once often did not return, because no one followed up.",
              ],
            },
            {
              head: (
                <>
                  First, we spent a week watching the{" "}
                  <em className="accent">phone</em>.
                </>
              ),
              body: [
                "Before building anything, we watched how bookings happened: where enquiries came from, what people asked first, and where they dropped off.",
                "The pattern was clear. When someone was interested, they wanted a straight answer, a price, and a slot, there and then. Not a callback tomorrow. Everything we built pointed at that.",
              ],
            },
            {
              head: (
                <>
                  Then we gave the website a{" "}
                  <em className="accent">front desk</em>.
                </>
              ),
              body: [
                "An assistant now sits on the JB Luxe site. It greets every visitor, asks what they drive and what they need, recommends the right package, quotes it on the spot, and books it into the diary. Day or night, deposit taken, confirmation sent.",
                "Behind it, a CRM keeps a record of every customer, car, and job, and reminds them when the next detail is due. JB kept detailing cars. The bookings kept coming in while the van was on the road.",
              ],
            },
          ]}
        />

        <CaseProduct
          heading={
            <>
              The front desk we <em className="accent">built</em>.
            </>
          }
          intro="One system handles the lot: answering customers, keeping their details, and booking the work in."
          surfaces={[
            {
              label: "Assistant",
              desc: "The assistant greets every visitor the moment they land, works out what they drive and what the job needs, then recommends the right package and quotes it on the spot. When the customer is ready, it offers real slots and takes the deposit, whatever the hour.",
              bullets: [
                "Every enquiry gets an instant answer, a price, and a slot it can book there and then",
                "Out-of-hours interest stops going to voicemail, and stops going to someone else",
                "The average reply went from four hours to thirty seconds",
                "85% of enquiries are handled start to finish without JB picking up",
              ],
              railName: "JB Luxe Assistant",
              railDesc:
                "The chat window on the JB Luxe site. It runs the whole conversation, from first question to quoted price to paid deposit, without the customer ever leaving the page.",
              device: "phone",
              node: <ChatMock />,
            },
            {
              label: "CRM",
              desc: "Every customer, car, and past job lives on one record, built up automatically as bookings come in. Quotes stop living in text threads, regulars get a reminder when the next detail is due, and the numbers that matter sit at the top of the page.",
              bullets: [
                "One record per customer: their cars, their jobs, and what they paid",
                "Quotes in one place instead of scattered across text messages",
                "Booked revenue, details completed, and follow-ups due, all at a glance",
                "First-time customers get followed up, not forgotten",
              ],
              railName: "Customer CRM",
              railDesc:
                "The back office behind the bookings. Every customer and car on file, the month's revenue and completed jobs up top, and the follow-ups coming due listed before they're missed.",
              device: "laptop",
              node: <CrmMock />,
            },
            {
              label: "Diary",
              desc: "Confirmed jobs drop straight into the day's schedule, each with its time, duration, and postcode. The assistant only offers slots that genuinely fit, so new bookings land around the work already in the diary and the driving in between.",
              bullets: [
                "A deposit and confirmation on every booking before it reaches the diary",
                "Each job carries its time, duration, and postcode for the day's run",
                "New bookings only land in slots that fit around existing work",
                "The paper notebook is gone, and the day is visible from the van",
              ],
              railName: "Diary",
              railDesc:
                "The day's run as JB sees it. Four jobs across town with times, durations, and postcodes, the current job marked live, and a new booking dropped in by the assistant mid-morning.",
              device: "laptop",
              node: <BookingMock />,
            },
          ]}
        />

        <CaseResults
          heading={
            <>
              What changed, in <em className="accent">numbers</em>.
            </>
          }
          stats={[
            { n: "3×", label: "more bookings" },
            { n: "30 sec", label: "average reply, down from 4 hours" },
            { n: "85%", label: "of enquiries handled automatically" },
          ]}
        />

        <CaseQuote
          quote="It books jobs while I’m asleep and quotes while I’m under a bonnet. My customers think I hired a receptionist. Since I switched on the assistant revenue has tripled and I’m now looking to expand the business."
          name="Judah Brown"
          role="Founder, JB Luxe Detailing"
        />

        <CaseCTA
          heading={
            <>
              Yours could run like <em className="accent">this</em>.
            </>
          }
        />

        <Footer />
      </div>
    </>
  );
}

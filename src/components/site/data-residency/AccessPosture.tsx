/**
 * 5 · M20 capabilities columns (white). The access posture distributed across
 * four labelled cells. Ported from mock-data-residency.html §5.
 */
export function AccessPosture() {
  const cells = [
    {
      title: "Your identity, your controls",
      body: "Because the deployment sits inside your environment, access runs on your identity and your controls: the same single sign-on, role-based access, and audit logging your other systems already use.",
    },
    {
      title: "Read-only where the work allows",
      body: "We work under read-only access where the work allows, scoped to the project and agreed in writing,",
    },
    {
      title: "Approval before production",
      body: "and nothing reaches production without your approval.",
    },
    {
      title: "You own everything",
      body: "Your content, the model's outputs, and anything we build with you stay yours.",
    },
  ];
  return (
    <section className="access" id="access">
      <div className="wrap">
        <h2>
          Who can <em>reach</em> it.
        </h2>
        <div className="caps">
          {cells.map((c) => (
            <div key={c.title} className="cap">
              <h4>{c.title}</h4>
              <p>{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

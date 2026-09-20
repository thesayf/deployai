CaseCard is the M25 case-study flip card: portrait shot + story title + serif client line; on hover it cross-fades to a flat accent ground (positional peri/cyan/coral/lavender/lime cycle) with outcome copy, sector and metric. Cards MUST sit inside `<div className="sc-cards"><div className="sc-row">…</div></div>` for the grid and accent cycle.

```jsx
<div className="sc-cards"><div className="sc-row">
  <CaseCard img="../../assets/case-jb.jpg" pos="50% 30%" title="A booking assistant that never sleeps"
    client="JB Luxe Detailing" desc={<>Bookings tripled.</>} sector="Automotive services" metric="Replies in 30 seconds" />
</div></div>
```

export function add_ga_event(event_name, object) {
  console.log("ga event is fired");
  window.gtag("event", event_name, { ...object });
  console.log("ga event is fired 1", event_name);
}

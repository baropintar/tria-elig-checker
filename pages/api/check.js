import elig from "../../eligible.json";

export default function handler(req, res) {
  const { handle } = req.query;

  if (!handle) {
    return res.status(400).json({ error: "Handle required" });
  }

  const clean = String(handle).replace("@", "").toLowerCase();

  const user = elig.find(
    (e) => e.handle.toLowerCase() === clean
  );

  if (!user) {
    return res.json({
      eligible: false,
      message: "Not eligible (not in list)."
    });
  }

  return res.json({
    eligible: true,
    data: user
  });
}

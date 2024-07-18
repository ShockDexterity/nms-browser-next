import { Planet } from "../types";

interface Submission {}

interface ErrResponse {
  status: number;
  msg: string;
}

export function validatePlanet(
  submission: Submission,
): [err: ErrResponse | null, planet?: Planet] {
  return [{ status: 501, msg: "Not Yet Implemented" }];
}

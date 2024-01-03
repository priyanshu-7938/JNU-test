pragma circom 2.0.0;
include "node_modules/circomlib/circuits/comparators.circom";

template isEighteenPlus() {
  signal input days;
  signal input id;
  signal tesAgainst <-- 18 * 365;
  signal output isValidAge;
  component check = LessThan(20);
  check.in[0] <== tesAgainst;
  check.in[1] <== days;
  isValidAge <== check.out;
}
component main = isEighteenPlus();
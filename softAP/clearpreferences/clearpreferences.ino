#include <Preferences.h>;
Preferences preferences;
void setup() {
  // put your setup code here, to run once:
  preferences.begin("credentials", false);
  preferences.clear();
}

void loop() {
  // put your main code here, to run repeatedly:

}

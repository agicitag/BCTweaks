# BCT Changelog

## 0.7.3
### Bugfixes:
- Slow down of room request on login
- Fixes Activity error which made the arousal go up on using any activity on others
- Added safeguards against `sender.BCT` being unitialized (By Rama)

### Minor Change:
- Updated to ModSdk 1.2.0
- Tips available on settings page

## 0.7.2
### Bugfixes:
- Fixed a bug with BF Locks which made them unavailable to unlock in public rooms

### Changed:
- Added a reset button for all settings
- Item permissions for BF Locks are now handled in BCTweaks settings page under Best Friends

## 0.7.1
### Bugfixes:
- Updated for R101
- Fixed an error with BF Lock where player wouldn't get access without Room Share enabled

## 0.7.0
### Minor Change:
- Exposed Colors for hints in settings in BCT_API

## 0.6.4
### Features:
- Money Transfer added (Using /send-money command)
- Changelog as chat message added

### Changed:
- Modified settings button

### Bugfixes:
- Sender must be present in chatroom to accept their offer.
- Multiple transactions of same amount got removed incorrectly.

## 0.6.3
### Features: 
- Preview Lock Icons now shows BF locks correctly.
- Added BCTweaks icon and Best Friends icon.
- Option to show icons only while hovering the mouse above the characters.

### Bugfixes:
- Removes redundant menu hitbox fix.
- Fixed crash on timer lock options.
- Add or remove time option was available for the wearer when "Enable Random Input" is ticked.

## 0.6.2
### Features:
- A new setting to share private rooms directly.

### Bugfixes:
- Room sharing should work more reliably now.
- Rate limit fix.

## 0.6.1
### Bugfixes:
- `TimerProcess` updated for R92

## 0.6.0
### Features:
- Change when you can add Best Friends. Now you can add any friend as Best Friend from Friendlist
- Add an option to convert High-Security Padlock to Best Friend Padlock

### Bugfixes:
- `ControllerIsActive()` instead of `ControllerActive` for R92

## 0.5.0
### Features:
- Update BCT settings button to show after "Gender"
- Change color of settings text on hover to better show it being able to be clicked
- Added API (feel free to request access to additional functions)
- Support male genitals
- Possibility for automatic erections based on arousal
- Added Best Friend Lock and Best Friend Timer Lock

### Bugfixes:
- Lovers and Owners access on BF locks wasn't correctly added 
- Timer Locks on items with extra effects didn't unlock on correct time
- Vibrators on zones that cant make you orgasm, still gave orgasm progress
- Random effects affected orgasm progress, regardless of zone
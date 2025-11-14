# Data Migration Tool - Design PRD
## Complete UI/UX Design Specification

---

## TABLE OF CONTENTS
1. [Color Schemes](#1-color-schemes)
2. [Typography](#2-typography)
3. [UI Components](#3-ui-components)
4. [States & Interactions](#4-states--interactions)
5. [Icons](#5-icons)
6. [Animations & Transitions](#6-animations--transitions)
7. [Layout Patterns](#7-layout-patterns)
8. [Text Content](#8-text-content)
9. [Validation & Error Messages](#9-validation--error-messages)
10. [Modals & Overlays](#10-modals--overlays)
11. [Special Features](#11-special-features--interactions)
12. [Responsive Design](#12-responsive-design-notes)
13. [Accessibility](#13-accessibility-considerations)
14. [Design System Summary](#14-summary-of-design-system)

---

## 1. COLOR SCHEMES

### Primary Colors
- **Blue 600**: `bg-blue-600` - Primary action buttons, active tabs
- **Blue 700**: `bg-blue-700` - Hover state for blue buttons
- **Blue 500**: `border-blue-500` - Active borders, focused inputs
- **Blue 100**: `bg-blue-100` - Skill tags, focused ring
- **Blue 50**: `bg-blue-50` - Selected text boxes, hover backgrounds

### Success Colors
- **Green 600**: `bg-green-600` - Success buttons, completion states
- **Green 700**: `bg-green-700` - Hover state for green buttons
- **Green 500**: `border-green-500` - Filled input borders
- **Green 200**: `border-green-200` - Completed section borders
- **Green 100**: `bg-green-100` - Success badges, mapped text highlight
- **Green 50**: `bg-green-50` - Completed section backgrounds

### Warning Colors
- **Orange 600**: `text-orange-600` - Clear/reset actions
- **Orange 100**: `bg-orange-100` - Clear button hover
- **Orange 50**: `bg-orange-50` - Clear button hover background
- **Amber 200**: `border-amber-200` - Warning border
- **Amber 50**: `bg-amber-50` - Warning background

### Error Colors
- **Red 600**: `text-red-600` - Error icons, delete actions
- **Red 500**: `border-red-500` - Error input borders, required markers
- **Red 200**: `border-red-200` - Error section borders
- **Red 100**: `bg-red-100` - Delete button hover
- **Red 50**: `bg-red-50` - Error backgrounds, incomplete sections

### Neutral Colors
- **Gray 900**: `text-gray-900` - Headings, primary text
- **Gray 800**: `text-gray-800` - Error text
- **Gray 700**: `text-gray-700` - Body text, labels
- **Gray 600**: `text-gray-600` - Secondary text
- **Gray 500**: `text-gray-500` - Hints, helper text
- **Gray 400**: `text-gray-400` - Icons, empty state text
- **Gray 300**: `border-gray-300` - Default borders, dividers
- **Gray 200**: `border-gray-200` - Light borders, cards
- **Gray 100**: `bg-gray-100` - Disabled backgrounds, inactive tabs
- **Gray 50**: `bg-gray-50` - Background panels, empty states

### Special Colors
- **Purple 600**: `bg-purple-600` - Floating panel toggle (active)
- **Purple 700**: `bg-purple-700` - Floating panel hover
- **Purple 50**: `hover:bg-purple-50` - Floating panel toggle hover
- **Black with opacity**: `bg-black bg-opacity-50` - Modal overlays
- **White**: `bg-white` - Cards, panels, main backgrounds

### Gradient Colors
- **Blue to Purple Gradient**: `bg-gradient-to-r from-blue-600 to-purple-600` - Milestone toast
- **Green to Blue Gradient**: `bg-gradient-to-br from-green-50 to-blue-50` - Completion screen
- **Blue to Gray Gradient**: `bg-gradient-to-br from-blue-50 to-gray-100` - Upload screen
- **Blue Gradient**: `bg-gradient-to-r from-blue-600 to-blue-700` - Floating panel header

---

## 2. TYPOGRAPHY

### Font Sizes
- **text-xs**: Helper text, character count, badges (12px)
- **text-sm**: Labels, button text, descriptions (14px)
- **text-base**: Body text (16px)
- **text-lg**: Section subtitles, card headers (18px)
- **text-xl**: Page titles (20px)
- **text-3xl**: Main headings (30px)
- **text-4xl**: Completion screen title (36px)

### Font Weights
- **font-normal**: Body text
- **font-medium**: Labels, button text, secondary headings
- **font-semibold**: Card headers, messages
- **font-bold**: Page titles, section headings

### Text Colors by Context
- **Headings**: `text-gray-900`
- **Body Text**: `text-gray-700`
- **Labels**: `text-gray-700`
- **Secondary Text**: `text-gray-600`
- **Hints**: `text-gray-500`
- **Error Messages**: `text-red-600` or `text-red-800`
- **Success Messages**: `text-green-600` or `text-green-800`
- **Warning Messages**: `text-yellow-800` or `text-amber-800`
- **Required Markers**: `text-red-500`

---

## 3. UI COMPONENTS

### 3.1 BUTTONS

#### Primary Button (Blue)
**Component Name**: Primary Action Button

**Classes**: `px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors`

**Icon Size**: `h-4 w-4` or `h-5 w-5`

**Examples**:
- "Add Experience"
- "Add Project"
- "Next"
- "Upload Resume"

**States**:
- Default: Blue background, white text
- Hover: Darker blue background
- Disabled: Gray background, cursor not-allowed

---

#### Success Button (Green)
**Component Name**: Success Action Button

**Classes**: `px-8 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed`

**Icon**: CheckCircle (`h-4 w-4`)

**Examples**:
- "Save & Exit"
- "Submit"

**States**:
- Default: Green background
- Hover: Darker green
- Disabled: Gray background

---

#### Secondary Button (Gray Border)
**Component Name**: Secondary Action Button

**Classes**: `px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors`

**Examples**:
- "Save & Exit" (header)
- "Cancel"

---

#### Danger Button (Text Only)
**Component Name**: Delete/Remove Button

**Classes**: `p-1 hover:bg-red-100 rounded text-red-600 transition-colors`

**Icon**: X (`h-5 w-5`)

**Examples**: Remove buttons on cards

---

#### Clear Button (Orange)
**Component Name**: Clear Action Button

**Classes**: `flex items-center gap-2 px-3 py-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors text-sm font-medium`

**Icon**: Eraser (`h-4 w-4`)

**Examples**: "Clear All" buttons

---

#### Icon Buttons
**Component Name**: Card Action Buttons

**Classes**: `p-1 hover:bg-blue-100 rounded text-blue-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent`

**Icons**:
- ArrowUp - Move card up
- ArrowDown - Move card down
- Copy - Duplicate card
- Eraser - Clear fields
- X - Remove card

**States**:
- Default: Icon visible
- Hover: Light blue background
- Disabled: 30% opacity, no hover effect

---

#### Floating Panel Toggle
**Component Name**: Layout Toggle Button

**Classes**: `px-4 py-2 rounded-lg transition-colors flex items-center gap-2`

**States**:
- Active: `bg-purple-600 text-white hover:bg-purple-700`
- Inactive: `text-purple-600 hover:bg-purple-50`

**Icon**: Layout (`h-4 w-4`)

**Text**: "Floating Panel" / "Traditional"

---

#### Upload Button
**Component Name**: File Upload CTA

**Classes**: `inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium cursor-pointer hover:bg-blue-700 transition-colors`

**Context**: File upload label

---

#### Large CTA Buttons
**Component Name**: Primary Call-to-Action Button

**Classes**: `w-full px-6 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2`

**Icons**: Eye, Users (`h-5 w-5`)

**Examples**:
- "View Your Profile"
- "Start Networking"

---

### 3.2 INPUT FIELDS

#### Text Input (FormField)
**Component Name**: Text Input Field

**Base Classes**: `w-full px-3 py-2 border rounded-lg transition-all focus:outline-none`

**States**:
- **Empty**: `border-gray-300`
- **Focused**: `border-blue-500 ring-2 ring-blue-100`
- **Filled**: `border-green-500 bg-green-50`
- **Error**: `border-red-500 bg-red-50`

**Visual Indicators**:
- Filled: Green checkmark icon (right side, animated bounce)
- Error: Red AlertCircle icon (right side)

---

#### Textarea
**Component Name**: Multiline Text Input

**Classes**: `w-full px-3 py-2 border rounded-lg transition-all resize-none`

**Rows**: 4

**States**: Same as text input

**Additional Feature**: Character counter
- Position: Below field, right-aligned
- Classes: `text-xs text-gray-500 text-right`
- Format: "X/2000 characters"

---

#### Date Inputs (Month Picker)
**Component Name**: Month Date Picker

**Type**: month

**Classes**: `w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none`

---

#### Dropdown/Select
**Component Name**: Select Dropdown

**Classes**: `w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none`

**Options**:
- Years (current - 20)
- Months (January - December)

---

#### Checkbox
**Component Name**: Checkbox Input

**Classes**: `w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500`

**Examples**:
- "I currently work here"
- Project status

---

#### Radio Buttons
**Component Name**: Radio Input

**Classes**: `w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500`

**Examples**: Project status (In progress / Finished)

---

#### File Input
**Component Name**: File Upload Input

**Type**: file

**Accept**: `.pdf,.doc,.docx,image/*`

**Classes**: `hidden` (triggered via label)

---

### 3.3 CARDS

#### Experience/Project/Education Card
**Component Name**: Editable Form Card

**Container Classes**:
- **Default**: `border rounded-lg p-6 transition-all border-gray-200 bg-white hover:border-gray-300`
- **Active**: `border-blue-500 shadow-lg bg-blue-50`

**Header**:
- Title: `text-lg font-semibold text-gray-900`
  - Examples: "Experience #1", "Project #1", "Education #1"
- Action Buttons: Row of icon buttons (ArrowUp, ArrowDown, Copy, Eraser, X)

**Layout**: Clickable card with form fields inside

**Behavior**: Click card to activate/select

---

#### Empty State Card
**Component Name**: Empty State Container

**Classes**: `text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300`

**Content Structure**:
- Icon: `mx-auto h-12 w-12 text-gray-400` (SVG)
- Heading: `text-gray-600 font-medium`
- Description: `text-sm text-gray-500`
- CTA Button: Primary button

**Examples**:
- "No work experience yet"
- "No projects yet"
- "No education yet"

---

#### Review Section Card
**Component Name**: Review Status Card

**Classes**:
- **Complete**: `border-2 rounded-lg p-4 border-green-200 bg-green-50`
- **Incomplete**: `border-2 rounded-lg p-4 border-red-200 bg-red-50`

**Content**:
- Icon: CheckCircle (green) or XCircle (red)
- Title: `font-semibold text-gray-900`
- Edit Button: `text-sm text-blue-600 hover:text-blue-700 font-medium`

---

#### Completion Summary Card
**Component Name**: Completion Summary Item

**Classes**:
- **Added**: `flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg`
- **Skipped**: `flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg`

**Badge**:
- **Added**: `text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded`
- **Skipped**: `text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded`

---

### 3.4 BADGES & TAGS

#### Skill Tag
**Component Name**: Skill Badge

**Classes**: `inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm font-medium group hover:bg-blue-200 transition-colors`

**Remove Button**: `hover:bg-blue-300 rounded-full p-0.5 transition-colors`

**Icon**: X (`h-3 w-3`)

---

#### Status Badge (Small)
**Component Name**: Status Badge

**Classes**: `text-xs font-medium px-2 py-1 rounded`

**Variants**:
- **Success**: `text-green-700 bg-green-100`
- **Info**: `text-gray-600 bg-gray-100`

---

#### Optional Label
**Component Name**: Optional Field Indicator

**Classes**: `text-xs text-gray-500 font-normal`

**Text**: "(Optional)"

---

### 3.5 PROGRESS INDICATORS

#### Progress Bar
**Component Name**: Progress Bar

**Container**: `w-32 h-2 bg-gray-200 rounded-full overflow-hidden`

**Fill**:
- **In Progress**: `bg-blue-600`
- **Complete**: `bg-green-600`

**Classes**: `h-full transition-all duration-300`

---

#### Progress Text
**Component Name**: Progress Label

**Classes**: `text-sm text-gray-600 font-medium`

**Format**: "Progress: X%"

---

### 3.6 TOOLTIPS

#### Tooltip Container
**Component Name**: Tooltip

**Classes**: `group relative`

**Trigger**: HelpCircle icon (`h-4 w-4 text-gray-400 cursor-help`)

**Tooltip Box**: `absolute left-0 bottom-full mb-2 hidden group-hover:block w-64 p-2 bg-gray-900 text-white text-xs rounded shadow-lg z-10`

---

### 3.7 ALERTS & NOTIFICATIONS

#### Selected Text Banner
**Component Name**: Selected Text Preview

**Classes**: `mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg`

**Content**:
- Label: `text-sm font-medium text-blue-900` - "Selected Text:"
- Text: `text-sm text-blue-800 italic` - Selected text in quotes
- Hint: `text-xs text-blue-600 mt-2` - "Click on any field to fill it with this text"

---

#### Info Box
**Component Name**: Information Alert

**Classes**: `bg-blue-50 border border-blue-200 rounded-lg p-4`

**Text**: `text-sm text-blue-800`

**Subtext**: `text-xs text-blue-600`

---

#### Warning Box
**Component Name**: Warning Alert

**Classes**: `bg-yellow-50 border border-yellow-200 rounded-lg p-3`

**Text**: `text-sm text-yellow-800`

---

#### Error Alert
**Component Name**: Error Alert Box

**Classes**: `mt-4 p-4 bg-red-50 border border-red-200 rounded-lg`

**Title**: `text-sm text-red-800 font-medium`

**List**: `text-xs text-red-700 list-disc list-inside space-y-1`

---

#### Success Message
**Component Name**: Success Alert

**Classes**: `bg-green-50 border border-green-200 rounded-lg p-4`

**Text**: `text-sm text-green-800`

---

#### Auto-save Indicator
**Component Name**: Auto-save Status

**Classes**: `flex items-center gap-2 text-sm text-green-600`

**Icon**: Save (`h-4 w-4`)

**Text**: "Auto-saved at HH:MM:SS"

---

### 3.8 DRAG & DROP ZONES

#### File Drop Zone
**Component Name**: File Upload Drop Zone

**Default**: `border-2 border-dashed rounded-lg p-12 text-center border-gray-300 hover:border-gray-400`

**Active**: `border-blue-500 bg-blue-50`

**Icon**: Upload (`h-16 w-16 text-gray-400`)

---

## 4. STATES & INTERACTIONS

### 4.1 BUTTON STATES

#### Default State
- Visible with standard colors
- Cursor: pointer

#### Hover State
- Background color darkens
- Transition: `transition-colors`
- Duration: ~200ms

#### Active/Pressed State
- Slightly darker background
- For floating panel toggle: `bg-purple-600 text-white`

#### Disabled State
- Classes: `disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-30`
- No hover effects
- Cursor: not-allowed

#### Loading State
- Not explicitly implemented in code

---

### 4.2 INPUT FIELD STATES

#### Empty State
- Border: `border-gray-300`
- Background: white
- Placeholder visible

#### Focused State
- Border: `border-blue-500`
- Ring: `ring-2 ring-blue-100`
- Placeholder visible
- Preview of selected text shown if available

#### Filled State
- Border: `border-green-500`
- Background: `bg-green-50`
- Check icon appears on right side (animated bounce-once)

#### Error State
- Border: `border-red-500`
- Background: `bg-red-50`
- AlertCircle icon on right side
- Error message below field

#### Disabled State
- Classes: `disabled:bg-gray-100 disabled:cursor-not-allowed`
- Border: `border-gray-300`
- Cursor: not-allowed

---

### 4.3 CARD STATES

#### Default State
- Border: `border-gray-200`
- Background: `bg-white`
- Hover: `hover:border-gray-300`

#### Active/Selected State
- Border: `border-blue-500`
- Background: `bg-blue-50`
- Shadow: `shadow-lg`
- Triggered by click

#### Hover State
- Border color changes to gray-300
- Smooth transition

---

### 4.4 SECTION COMPLETION STATES

#### Complete Section
- Border: `border-green-200`
- Background: `bg-green-50`
- Icon: CheckCircle (green)

#### Incomplete Section
- Border: `border-red-200`
- Background: `bg-red-50`
- Icon: XCircle (red)

#### Empty/Skipped Section
- Border: `border-gray-200`
- Background: `bg-gray-50`
- Icon: XCircle (gray)

---

### 4.5 INTERACTIVE BEHAVIORS

#### Click Behaviors
- **Form fields**: If selected text exists, clicking fills field
- **Cards**: Click to activate/select
- **Buttons**: Execute primary action
- **Icon buttons**: Stop propagation on parent card click

#### Drag & Drop
- **File upload**: Drag over activates drop zone visual
- **Floating panel**: Drag header to reposition
- **Resize handle**: Drag bottom-right corner to resize

#### Right-Click (Context Menu)
- Available in floating panel mode
- Shows field mapping options
- Prevents default browser menu

#### Keyboard Interactions
- **Enter key**: Submit skill input
- **Escape key**: Close context menu
- **Tab**: Navigate between fields

---

## 5. ICONS

**Library**: lucide-react

### Navigation & Actions
- **ArrowRight**: Navigation between sections (`h-4 w-4`)
- **ArrowUp**: Move card up in list (`h-5 w-5`)
- **ArrowDown**: Move card down in list (`h-5 w-5`)
- **X**: Close/remove actions (`h-4 w-4` or `h-5 w-5`)
- **Plus**: Add new items (`h-4 w-4` or `h-5 w-5`)

### Status Icons
- **CheckCircle**: Success, completion (`h-4 w-4` or `h-5 w-5`)
- **XCircle**: Error, incomplete (`h-5 w-5`)
- **AlertCircle**: Warning, error (`h-3 w-3` or `h-5 w-5`)
- **HelpCircle**: Tooltip trigger (`h-4 w-4`)
- **Sparkles**: Progress encouragement (`h-4 w-4` or `h-6 w-6`)

### File & Content
- **Upload**: File upload (`h-4 w-4` or `h-16 w-16`)
- **FileText**: File preview (`h-12 w-12`)
- **Save**: Auto-save indicator (`h-4 w-4`)
- **Send**: Context menu "send to field" (`h-3 w-3`)

### Panel & Layout
- **Layout**: Floating panel toggle (`h-4 w-4`)
- **Minimize2**: Minimize panel (`h-4 w-4`)
- **Maximize2**: Maximize panel, fit to width (`h-4 w-4`)
- **GripHorizontal**: Drag handle (`h-5 w-5`)

### Zoom Controls
- **ZoomIn**: Increase zoom (`h-4 w-4`)
- **ZoomOut**: Decrease zoom (`h-4 w-4`)

### Actions
- **Copy**: Duplicate card (`h-5 w-5`)
- **Eraser**: Clear fields (`h-4 w-4` or `h-5 w-5`)
- **Eye**: View profile (`h-5 w-5`)
- **Users**: Networking (`h-5 w-5`)

---

## 6. ANIMATIONS & TRANSITIONS

### 6.1 CSS Transitions

**Classes**:
- `transition-colors` - ~200ms color transitions
- `transition-all` - All properties transition
- `duration-300` - 300ms duration for progress bar
- `duration-500` - 500ms for toast notifications

---

### 6.2 Custom Animations

#### Bounce Once (Success Checkmark)
**Name**: bounce-once

**CSS**:
```css
@keyframes bounce-once {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
.animate-bounce-once {
  animation: bounce-once 0.6s ease-out;
}
```

**Usage**: Checkmark icon when field is filled

---

#### Pulse (Sparkles Icon)
**Name**: animate-pulse

**Usage**: Sparkles icon at 100% progress completion

---

#### Slide In/Out (Toast Notification)
**Name**: Milestone Toast Animation

**States**:
- Show: `translate-y-0 opacity-100`
- Hide: `translate-y-8 opacity-0 pointer-events-none`

**Transition**: `transition-all duration-500`

**Position**: `fixed bottom-8 left-1/2 transform -translate-x-1/2`

---

### 6.3 Transform Animations

#### Zoom/Scale (Resume Viewer)
**Transform**: `scale(${zoom / 100})`

**Origin**: `transform-origin: top center`

**Transition**: `transition-transform`

---

#### Hover Scale
- Cards: Subtle shadow increase on hover
- Buttons: Background color change

---

## 7. LAYOUT PATTERNS

### 7.1 PAGE LAYOUTS

#### Full Screen Layout
**Name**: Main Application Layout

**Container**: `h-screen flex flex-col bg-white`

**Structure**:
- Header: Fixed header with navigation
- Content: `flex-1 flex overflow-hidden`
- Sections: Split view (50-50 or full width with floating panel)

---

#### Upload Screen Layout
**Name**: Resume Upload Screen

**Container**: `min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4`

**Card**: `max-w-2xl w-full bg-white rounded-xl shadow-lg p-8`

---

#### Completion Screen Layout
**Name**: Profile Completion Screen

**Container**: `min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4`

**Card**: `max-w-2xl w-full bg-white rounded-xl shadow-lg p-12 text-center`

---

### 7.2 HEADER LAYOUT

#### Main Header
**Name**: Application Header

**Classes**: `border-b border-gray-200 bg-white px-6 py-4`

**Structure**:
- **Top Row**: Title, Progress, Actions
- **Bottom Row**: Section navigation tabs

---

#### Progress Section
**Name**: Progress Indicator Section

**Layout**: `flex items-center gap-3`

**Components**:
- Progress bar with percentage
- Vertical divider (`border-l`)
- Encouraging message with sparkles icon
- Time estimate

---

### 7.3 SPLIT VIEW LAYOUT

#### Resume Viewer (Left/Full)
**Name**: Resume Preview Panel

**Classes**:
- Default: `w-1/2`
- Floating Panel Mode: `w-full`

---

#### Form Panel (Right)
**Name**: Data Entry Form Panel

**Classes**:
- Default: `w-1/2 overflow-auto`
- Hidden: In floating panel mode

**Container**: `p-8`

---

### 7.4 GRID LAYOUTS

#### Two Column Grid
**Name**: Two Column Form Grid

**Classes**: `grid grid-cols-2 gap-4`

**Examples**:
- Start date / End date
- Year / Month selectors

---

#### Flex Wrap Grid (Skills)
**Name**: Skills Tag Grid

**Classes**: `flex flex-wrap gap-2`

**Items**: Skill tags with remove buttons

---

### 7.5 FLOATING PANEL

**Name**: Floating Draggable Panel

#### Position
**Classes**: `fixed z-50`

**Style**: `left: Xpx, top: Ypx`

**Default**: x: 100, y: 100 (saved to localStorage)

---

#### Size
**Default**: width: 400px, height: 600px (saved to localStorage)

**Minimized**: width: auto, height: auto

---

#### Constraints
- Minimum width: 300px
- Minimum height: 200px
- Stays within viewport bounds

---

### 7.6 MODAL OVERLAY

#### Backdrop
**Name**: Modal Overlay

**Classes**: `fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4`

---

#### Modal Content
**Name**: Modal Dialog

**Classes**: `bg-white rounded-xl shadow-2xl max-w-md w-full p-6`

---

## 8. TEXT CONTENT

### 8.1 PAGE TITLES

#### Upload Screen
- **Heading**: "Build Your Professional Profile"
- **Subheading**: "Upload your resume and we'll help you create a compelling profile in minutes"

#### Migration Tool
- **Heading**: "Data Migration"

#### Completion Screen
- **Heading**: "Your Profile is Live!"
- **Subheading**: "You've successfully created your professional profile and can now start connecting with others."

---

### 8.2 SECTION HEADINGS

- "Basic Information"
- "Work Experience"
- "Projects"
- "Education"
- "Skills"
- "Review Your Profile"

---

### 8.3 SECTION DESCRIPTIONS

- "Select text from your resume and click the field to fill it" (Basic Info)
- "Add your work experience and internships" (Experience)
- "Stand out by adding details about projects you have done" (Projects)
- "Add your educational qualifications" (Education)
- "Add your professional skills" (Skills)
- "Check everything looks good before completing" (Review)

---

### 8.4 BUTTON LABELS

#### Primary Actions
- "Upload Resume"
- "Let's Build Your Profile"
- "Add Experience"
- "Add Project"
- "Add Education"
- "Next"
- "Save & Exit"
- "Submit"
- "View Your Profile"
- "Start Networking"

#### Secondary Actions
- "Change Resume"
- "Change File"
- "Keep Current Data"
- "Clear All Fields"
- "Clear All"
- "Cancel"
- "Edit"
- "Add"

#### Toggle Actions
- "Floating Panel" / "Traditional"
- "Use Floating Panel" / "Use Traditional Layout"

---

### 8.5 FIELD LABELS

#### Basic Information
- "Full Name" (required)
- "Email" (required)
- "Phone" (required)
- "Location" (optional)
- "Professional Headline" (optional)

#### Work Experience
- "Job Title" (required)
- "Company Name" (required)
- "Start Date" (required)
- "End Date" (required if not current)
- "I currently work here" (checkbox)
- "Description" (optional)

#### Projects
- "Project title" (required)
- "Client" (required)
- "Project status" (In progress / Finished)
- "Worked from" (required)
- "Details of project" (required)

#### Education
- "Degree/Certification" (required)
- "Institution/University" (required)
- "Field of Study" (optional)
- "Duration" (Start Year / End Year)

#### Skills
- "Add Skills"
- "Your Skills (X)"

---

### 8.6 PLACEHOLDERS

#### Basic Info
- "City, State/Country" (Location)
- "e.g., Senior Product Manager | 5+ years experience" (Headline)

#### Experience
- "e.g., Senior Product Manager, Software Engineer" (Job Title)
- "e.g., Tech Corp, StartupXYZ" (Company)
- "Describe your key responsibilities and achievements" (Description)

#### Projects
- "Enter project title"
- "Enter client name"
- "Type here..." (Description)

#### Education
- "e.g., Bachelor of Science, MBA, AWS Certified" (Degree)
- "e.g., Stanford University, Coursera" (Institution)
- "e.g., Computer Science, Business Administration" (Field of Study)

#### Skills
- "Type skills separated by commas or select from resume"

#### Generic
- "Select {field} from resume"

---

### 8.7 HINTS & HELPER TEXT

#### Basic Info
- "Optional: A brief headline that describes your professional identity"

#### Experience
- "Highlight key achievements, responsibilities, and impact (2-3 sentences work best)"

#### Projects
- "Describe what the project was about, technologies used, and your role"

#### Skills
- "Tip: Select multiple skills at once (comma or line-separated)"
- "Tip: Add 8-15 skills for best visibility on your profile"

#### FormField
- "Click to fill with selected text" (when text selected and focused)

#### Upload
- "Supports PDF, DOC, DOCX (Max 5MB)"
- "Your resume is secure and only visible to you"

#### Character Counter
- "X/2000 characters" (Experience description)
- "X/1000 characters" (Project description)

---

### 8.8 ENCOURAGEMENT MESSAGES

#### Progress Messages
- "Let's get started!" (0%)
- "Great! Let's build your profile." (>0%)
- "You're off to a great start!" (25%)
- "Halfway there! Keep going." (50%)
- "Almost done! Your profile is looking strong." (75%)
- "Perfect! Your profile is complete." (100%)

#### Time Estimates
- "This will take about 5 minutes" (<50%)
- "You're doing great—2 minutes left" (50-75%)
- "Just 3 more fields to go" (specific count)
- "Just 2 more fields to go"
- "Just 1 more field to go"
- "All done!"

#### Milestone Toasts
- "🎉 You're off to a great start!" (25%)
- "🚀 Halfway there! Keep going." (50%)
- "⭐ Almost done! Your profile is looking strong." (75%)
- "🎊 Perfect! Your profile is complete." (100%)

---

### 8.9 STATUS MESSAGES

#### Auto-save
- "Auto-saved at HH:MM:SS"

#### Upload
- "Estimated time: 5-8 minutes"
- "We'll guide you through extracting information from your resume to build your profile"

#### Completion
- "Added" (green badge)
- "Skipped" (gray badge)

#### Empty States
- "No work experience yet"
- "No projects yet"
- "No education yet"
- "No skills added yet"

#### Additional Info
- "X entry/entries" (Experience/Education count)
- "X project/projects" (Projects count)
- "X skill/skills" (Skills count)

#### Resume Viewer Legend
- "Unassigned" (gray box)
- "Mapped" (green box)

---

## 9. VALIDATION & ERROR MESSAGES

### 9.1 FIELD VALIDATION

#### Email Validation
**Validation Name**: Email Format Check

**Regex**: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`

**Error Message**: "Please enter a valid email address"

**Display**: Below field with AlertCircle icon

---

#### Required Fields
**Validation Name**: Required Field Check

**Visual Marker**: Red asterisk (*) next to label

**Visual Feedback**: Border turns red if empty on blur

---

### 9.2 ERROR MESSAGES

#### Basic Information Errors
- "Please enter a valid email address"
- "Required fields missing or invalid. Please ensure Name, valid Email, and Phone are filled."

#### Experience Errors
- "Please complete the experience entries you've started."

#### Projects Errors
- "Please complete the project entries you've started."

#### Education Errors
- "Please complete the education entries you've started."

#### Skills Errors
- "Please add at least 3 skills (currently X)."
- "Please add at least 3 skills or remove started skills"

#### File Upload Errors
- "Please upload a PDF or DOC file" (via alert)
- "File size must be less than 5MB" (via alert)

---

### 9.3 COMPLETION ERRORS

#### Cannot Complete Modal
**Component Name**: Completion Error Alert

**Classes**: `mt-4 p-4 bg-red-50 border border-red-200 rounded-lg`

**Title**: "⚠️ Cannot complete profile"

**Error List**:
- "Complete Basic Information with valid email (required)"
- "Complete started experience entries"
- "Complete started project entries"
- "Complete started education entries"
- "Add at least 3 skills or remove started skills"

**Display**: Red alert box with bullet list

**Auto-hide**: After 5 seconds

---

### 9.4 CONFIRMATION DIALOGS

**Component Name**: Browser Confirmation Dialog

#### Clear All Confirmation
- "Are you sure you want to clear all basic information fields?"
- "Are you sure you want to clear all skills?"
- "Are you sure you want to clear all fields in this experience?"
- "Are you sure you want to clear all fields in this project?"
- "Are you sure you want to clear all fields in this education entry?"

#### Remove Confirmation
- "Are you sure you want to remove this experience?"
- "Are you sure you want to remove this project?"
- "Are you sure you want to remove this education entry?"

---

#### Change Resume Modal
**Component Name**: Change Resume Confirmation Modal

**Title**: "Change Resume?"

**Description**: "What would you like to do with your current data?"

**Options**:

1. **Keep Current Data**
   - "Upload a new resume but keep all the information you've already entered"
   - Border: Blue

2. **Clear All Fields**
   - "Upload a new resume and start fresh (all current data will be lost)"
   - Border: Red

**Actions**: Cancel button

---

### 9.5 WARNING MESSAGES

#### Review Section Warnings
**Component Name**: Action Required Warning

**Classes**: `bg-amber-50 border border-amber-200 rounded-lg p-4`

**Title**: "⚠️ Action Required"

**Messages**:
- "Please complete Basic Information with valid email (required)."
- "Please complete started experience entries."
- "Please complete started project entries."
- "Please complete started education entries."
- "Please add at least 3 skills if you want to include them."

---

#### Skills Warning
**Component Name**: Skills Recommendation

**When**: Less than 8 skills added

**Message**: "Tip: Add 8-15 skills for best visibility on your profile"

**Style**: Yellow info box

---

### 9.6 SUCCESS MESSAGES

#### Review Section Success
**Component Name**: Ready to Complete Success

**Classes**: `bg-green-50 border border-green-200 rounded-lg p-4`

**Title**: "✓ Ready to Complete!"

**Message**: "All required information is complete. Click Save & Exit to finish."

---

## 10. MODALS & OVERLAYS

### 10.1 CHANGE RESUME MODAL

**Component Name**: Change Resume Dialog

#### Structure
**Overlay**: `fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4`

**Modal**: `bg-white rounded-xl shadow-2xl max-w-md w-full p-6`

---

#### Header
- **Title**: "Change Resume?" (`text-xl font-bold`)
- **Description**: "What would you like to do with your current data?" (`text-sm text-gray-600`)
- **Close button**: X icon (top right)

---

#### Options (2)
**Classes**: `w-full p-4 border-2 rounded-lg transition-all text-left`

**Option 1** (Keep Data):
- Classes: `border-blue-200 hover:border-blue-500 hover:bg-blue-50`
- Title: `font-semibold text-gray-900`
- Description: `text-sm text-gray-600`

**Option 2** (Clear Data):
- Classes: `border-red-200 hover:border-red-500 hover:bg-red-50`
- Title: `font-semibold text-gray-900`
- Description: `text-sm text-gray-600`

---

#### Footer
- Cancel button: Full width, gray

---

### 10.2 FLOATING PANEL

**Component Name**: Draggable Floating Panel

#### Header
**Classes**: `drag-handle flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg cursor-grab active:cursor-grabbing`

**Icon**: GripHorizontal

**Title**: `font-semibold text-sm`

**Actions**: Minimize, Close buttons

---

#### Content Area
**Classes**: `flex-1 overflow-auto p-4`

**Content**: Same as form sections

---

#### Resize Handle
**Position**: `absolute bottom-0 right-0`

**Size**: `w-4 h-4`

**Cursor**: `cursor-se-resize`

**Visual**: Diagonal gradient stripe

---

#### Features
- **Draggable**: By header
- **Resizable**: By bottom-right corner
- **Minimizable**: Collapses to header only
- **Closable**: Returns to traditional layout
- **Persistent**: Position & size saved to localStorage

---

### 10.3 CONTEXT MENU

**Component Name**: Right-Click Context Menu

#### Structure
**Position**: `fixed` (calculated based on click position)

**Classes**: `bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-[100] min-w-[200px]`

**Behavior**: Position adjusts to stay within viewport

---

#### Header
**Classes**: `px-3 py-2 border-b border-gray-100`

**Content**: "Send to field" with Send icon

---

#### Options List
**Container**: `max-h-[300px] overflow-auto`

**Item Classes**:
- Default: `w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700`
- Disabled: `text-gray-400 cursor-not-allowed`

---

#### Behavior
- Triggered by right-click on selected text
- Closes on: Outside click, Escape key, Option selection
- Shows field mapping options for experiences
- Format: "Experience #X - Field Name"

---

### 10.4 MILESTONE TOAST

**Component Name**: Milestone Celebration Toast

#### Structure
**Position**: `fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50`

**Transition**: translate-y, opacity

**Duration**: 500ms

**Show Duration**: 4000ms (4 seconds)

---

#### Style
**Classes**: `bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3`

**Icon**: Sparkles (`h-6 w-6 animate-pulse`)

**Text**: `text-lg font-semibold`

---

#### Animations
- Slide in from bottom
- Fade in/out
- Auto-dismiss after 4 seconds

---

## 11. SPECIAL FEATURES & INTERACTIONS

### 11.1 TEXT SELECTION SYSTEM

**Feature Name**: Resume Text Selection & Auto-fill

#### Resume Viewer Selection
- **Event**: mouseup
- **Captures**: window.getSelection()
- **Stores**: Selected text in state
- **Visual**: Blue banner at top of form panel

---

#### Selected Text Banner
**Classes**: `mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg`

**Content**:
- "Selected Text:"
- Text preview in quotes (italic)
- "Click on any field to fill it with this text"

---

#### Auto-fill Behavior
- Click any input field to fill with selected text
- Text gets marked as "mapped"
- Selected text clears after assignment

---

### 11.2 TEXT MAPPING & HIGHLIGHTING

**Feature Name**: Resume Text Mapping System

#### Mapped Text Tracking
- **Stores**: Set of mapped text ranges
- **Visual**: Green highlight on resume
- **Format**: `<mark class="bg-green-100 border-b-2 border-green-300 text-gray-900">`

---

#### Legend (Bottom of Resume Viewer)
- **Unassigned**: Gray box
- **Mapped**: Green box with border

---

### 11.3 RESUME VIEWER CONTROLS

**Feature Name**: Resume Zoom & Navigation

#### Zoom Controls
- **Zoom In**: +25% (max 200%)
- **Zoom Out**: -25% (min 50%)
- **Fit to Width**: Reset to 100%
- **Display**: "X%" in center

---

#### PDF vs Text Display
- **PDF**: iframe with src
- **Text/Image**: Rendered HTML with highlighting

---

### 11.4 PROGRESS TRACKING

**Feature Name**: Profile Completion Tracker

#### Calculation Logic
**Total**: 6 core fields
- 4 basic info fields (name, email, phone, location)
- 1 for any experience
- 1 for 5+ skills

**Formula**: (completed / total) * 100

---

#### Visual Updates
- Progress bar fills
- Color changes at 100% (blue → green)
- Encouraging message updates
- Time estimate updates
- Milestone toasts trigger at 25%, 50%, 75%, 100%

---

### 11.5 AUTO-SAVE SYSTEM

**Feature Name**: Auto-save Data Persistence

#### Trigger
- 2 seconds after any data change
- Monitors: basicInfo, experiences, projects, education, skills

---

#### Visual Feedback
- Green "Auto-saved" indicator
- Shows timestamp
- Save icon (lucide-react)

---

#### Storage
- Currently: console.log (placeholder)
- Intended: Backend/localStorage

---

## 12. RESPONSIVE DESIGN NOTES

### Breakpoints (Tailwind Default)
- **Mobile**: Default
- **Tablet**: `sm:` (640px)
- **Desktop**: `md:` (768px), `lg:` (1024px)

---

### Layout Adaptations
- Grid layouts: Collapse to single column on mobile
- Split view: May need vertical stacking
- Floating panel: May need different default size
- Modal: Responsive padding and max-width

---

### Typography Scaling
- Headings scale down on mobile
- Padding reduces on smaller screens

---

## 13. ACCESSIBILITY CONSIDERATIONS

### Keyboard Navigation
- Tab order through forms
- Enter key submission for skills
- Escape to close modals

---

### ARIA Labels
- File input has proper labels
- Buttons have title attributes for tooltips
- Icons have descriptive titles

---

### Color Contrast
- Text on backgrounds meets WCAG standards
- Error states use both color and icons
- Disabled states clearly distinguishable

---

### Focus States
- Blue ring on focused inputs
- Visible focus indicators on buttons
- Keyboard navigable modals

---

## 14. SUMMARY OF DESIGN SYSTEM

### Color Palette
- **Primary**: Blue (600-50)
- **Success**: Green (600-50)
- **Warning**: Orange/Amber (600-50)
- **Error**: Red (600-50)
- **Neutral**: Gray (900-50)
- **Accent**: Purple (700-50)

---

### Typography Scale
- **Sizes**: xs, sm, base, lg, xl, 3xl, 4xl
- **Weights**: normal, medium, semibold, bold

---

### Spacing System (Tailwind Default)
- 0.5rem increments (2, 3, 4, 6, 8, 12 units)
- Padding: p-2 through p-12
- Gap: gap-1 through gap-6

---

### Border Radius
- `rounded`: 0.25rem
- `rounded-lg`: 0.5rem
- `rounded-xl`: 0.75rem
- `rounded-full`: 9999px (pills, badges)

---

### Shadows
- `shadow-lg`: Large cards
- `shadow-xl`: Context menu
- `shadow-2xl`: Modals, floating panel

---

## 15. COMPONENT NAMING CONVENTION

All components follow this naming structure:

**Format**: `{Purpose} {Type}`

**Examples**:
- Primary Action Button
- Text Input Field
- Editable Form Card
- Milestone Celebration Toast
- Resume Text Selection System

---

## END OF DESIGN PRD

**Version**: 1.0
**Last Updated**: 2025-11-14
**Status**: Complete

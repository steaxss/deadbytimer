# DBD Timer Overlay

A lightweight and performant desktop application for Dead by Daylight 1v1 competitive matches. Features a transparent overlay with dual timers, customizable styles, and global hotkeys.

## Features

- **Dual Timer System**: Independent timers for each player with precise millisecond accuracy
- **Multiple Overlay Styles**: Default, Minimal, Circular, and Nostalgia themes
- **Global Hotkeys**: Control timers from anywhere without focusing the app
- **Transparent Overlay**: Click-through overlay when locked, draggable when unlocked
- **Player Management**: Customizable player names and score tracking
- **Persistent Settings**: All configurations saved automatically
- **Low Resource Usage**: Optimized for gaming performance

## Installation

### Development Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd dbdoverlaytools-free
```

2. Install dependencies:
```bash
npm install
```

3. Start development mode:
```bash
npm run electron:dev
```

### Building for Production

Build the application:
```bash
npm run build
```

This will create executables in the `release` folder.

## Usage

### Control Panel

The main control panel allows you to:
- Start, pause, and reset timers
- Switch between active timers
- Modify player names and scores
- Configure overlay settings
- Set custom hotkeys
- Show/hide the overlay

### Overlay Controls

- **Drag Handle**: Appears when overlay is unlocked for repositioning
- **Lock Toggle**: Enable click-through mode for gaming
- **Style Selection**: Choose from 4 different visual themes
- **Scale Adjustment**: Resize overlay from 50% to 200%

### Default Hotkeys

- **F1**: Start/Pause active timer
- **F2**: Swap to other timer

## Overlay Styles

### Default
Clean layout with player names, timers, and score display. Ideal for streaming.

### Minimal
Compact design with essential information only. Perfect for limited screen space.

### Circular
Unique circular design with timer circles. Eye-catching for viewers.

### Nostalgia
Retro terminal-style green text on black background. Classic gaming aesthetic.

## Technical Specifications

- **Framework**: Electron + React + TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Build Tool**: Vite
- **Storage**: electron-store for persistence
- **Hotkeys**: electron-localshortcut for global shortcuts

## Performance Optimization

- Precise timer using requestAnimationFrame
- Minimal re-renders with optimized React components
- Efficient IPC communication between main and overlay windows
- Low memory footprint (<100MB typical usage)

## Configuration

All settings are automatically saved to:
- **Windows**: `%APPDATA%/dbd-timer-overlay/config.json`
- **macOS**: `~/Library/Preferences/dbd-timer-overlay/config.json`
- **Linux**: `~/.config/dbd-timer-overlay/config.json`

## Development

### Project Structure

```
src/
├── components/           # React components
│   ├── overlay/         # Overlay-specific components
│   └── ControlPanel.tsx # Main control interface
├── hooks/               # Custom React hooks
├── store/               # Zustand state management
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
└── main.tsx            # Application entry point

electron/
├── main.ts             # Electron main process
└── preload.ts          # IPC preload script
```

### Architecture

- **Multi-window**: Separate main control panel and overlay window
- **IPC Communication**: Secure communication via preload scripts
- **State Synchronization**: Real-time sync between windows
- **Persistent Storage**: Automatic saving of user preferences

## License

MIT License - see LICENSE file for details

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For issues, feature requests, or questions, please create an issue in the GitHub repository.
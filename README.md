# Synthetic Strategist App

A prototype AI chat interface for strategic insights, designed for analyzing client documentation and generating focused reports.

## Overview

The Synthetic Strategist app allows users to upload client information and documentation, then explore insights through four specialized reports:
- Category Report
- Company Report
- Consumer Report
- Commercial Report

Users can highlight interesting information in reports and create nested conversation threads to explore specific topics in depth.

## Features

- **Project Setup**: Upload client name, brief, overview, and supporting documents
- **Specialized Reports**: View AI-generated reports on category, company, consumer, and commercial insights
- **Interactive Chat**: Converse with the AI about uploaded content
- **Thread Creation**: Highlight text to create nested conversation threads
- **Insight Exploration**: Deep-dive into specific topics of interest

## Getting Started

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```

### Running the App

Start the development server:
```
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Usage Guide

1. **Set up a project**:
   - Enter client name and brief
   - Add overview information
   - Upload supporting documents

2. **Explore reports**:
   - Navigate to any of the four report types
   - Read through the AI-generated insights
   - Highlight interesting text to create threads

3. **Create conversation threads**:
   - Highlight any text in reports or AI responses
   - Click "Create Thread" in the tooltip
   - Engage in focused conversation about the highlighted content

4. **Navigate threads**:
   - Use the sidebar to view all created threads
   - Threads are organized under the relevant report or chat

## Technical Details

Built with:
- React
- React Router
- Styled Components

## Note

This is a prototype application with placeholder content for demonstration purposes. In a production version, the AI would generate content based on actual uploaded documents.

# Goals Generator Chrome Extension

A Chrome extension to generate hierarchical goals and tasks data and export it as a CSV file.

## Features

- Generate hierarchical goals with customizable depth (1-4 levels)
- Configure number of child goals per parent goal
- Add tasks for each goal
- Uses OpenAI GPT-3.5 to generate realistic goal and task names
- Export data as a CSV file

## Installation

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" at the top-right corner
4. Click "Load unpacked" and select the extension folder
5. If you get an icon error, you can safely ignore it - the extension will still work without icons

## Usage

1. Click on the extension icon in your Chrome toolbar (or find it in the extensions menu)
2. Enter your OpenAI API key and click "Save Key"
3. Configure the following parameters:
   - Hierarchy Depth: The depth of the goal hierarchy (1-4 levels)
   - Child Goals per Parent: Number of child goals for each parent goal
   - Tasks per Goal: Number of tasks for each goal
   - Target Total Rows: Target number of rows in the CSV file
4. Click "Generate CSV" to start the generation process
5. Once completed, the CSV file will be downloaded automatically

## Note

This extension requires an OpenAI API key to generate goal and task names. You can obtain an API key from [OpenAI's website](https://platform.openai.com/).

## Privacy

Your OpenAI API key is stored locally in your browser and is only used to make API calls to OpenAI. It is never sent to any other servers. 
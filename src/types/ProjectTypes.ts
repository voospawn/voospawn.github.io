export type Language =
  | 'javascript'
  | 'typescript'
  | 'python'
  | 'cpp'
  | 'java'
  | 'kotlin'
  | 'html'
  | 'css'
  | 'markdown'
  | 'plaintext';

export interface ProjectTemplate {
  id: string;
  name: string;
  language: Language;
  description: string;
  defaultFile: string;
  files: {
    [key: string]: string;
  };
}

export const PROJECT_TEMPLATES: ProjectTemplate[] = [
  {
    id: 'web-vanilla',
    name: 'Web (HTML/CSS/JS)',
    language: 'html',
    description: 'Basic web project with HTML, CSS, and JavaScript',
    defaultFile: 'index.html',
    files: {
      'index.html': '<!DOCTYPE html>\n<html>\n<head>\n  <title>My Web Project</title>\n  <link rel="stylesheet" href="styles.css">\n</head>\n<body>\n  <h1>Hello World</h1>\n  <script src="script.js"></script>\n</body>\n</html>',
      'styles.css': 'body {\n  margin: 0;\n  padding: 20px;\n  font-family: Arial, sans-serif;\n}',
      'script.js': 'console.log("Hello from JavaScript!");'
    }
  },
  {
    id: 'python',
    name: 'Python',
    language: 'python',
    description: 'Python project with main script',
    defaultFile: 'main.py',
    files: {
      'main.py': 'def main():\n    print("Hello from Python!")\n\nif __name__ == "__main__":\n    main()'
    }
  },
  {
    id: 'cpp',
    name: 'C++',
    language: 'cpp',
    description: 'C++ project with main file',
    defaultFile: 'main.cpp',
    files: {
      'main.cpp': '#include <iostream>\n\nint main() {\n    std::cout << "Hello from C++!" << std::endl;\n    return 0;\n}'
    }
  },
  {
    id: 'java',
    name: 'Java',
    language: 'java',
    description: 'Java project with main class',
    defaultFile: 'Main.java',
    files: {
      'Main.java': 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello from Java!");\n    }\n}'
    }
  },
  {
    id: 'kotlin',
    name: 'Kotlin',
    language: 'kotlin',
    description: 'Kotlin project with main function',
    defaultFile: 'main.kt',
    files: {
      'main.kt': 'fun main() {\n    println("Hello from Kotlin!")\n}'
    }
  },
  {
    id: 'markdown',
    name: 'Markdown',
    language: 'markdown',
    description: 'Markdown document with preview',
    defaultFile: 'document.md',
    files: {
      'document.md': '# Welcome to Markdown\n\nThis is a sample markdown document.\n\n## Features\n\n- Lists\n- **Bold text**\n- *Italic text*\n- [Links](https://example.com)'
    }
  }
];
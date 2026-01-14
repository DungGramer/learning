#!/bin/bash
# Clean up old files after refactoring

echo "🧹 Cleaning up old files after refactoring..."

# Remove old feature-based structure
echo "Removing old features/ directory..."
rm -rf lib/features/

# Remove old core/ directory  
echo "Removing old core/ directory..."
rm -rf lib/core/

# Remove old GetX files
echo "Removing old GetX implementation files..."
rm -f lib/main_getx.dart

# Optional: Remove Bloc dependencies from pubspec.yaml
echo "⚠️  Remember to remove flutter_bloc from pubspec.yaml dependencies"

echo "✅ Cleanup completed!"
echo ""
echo "📁 New structure:"
echo "lib/"
echo "├── bindings/"
echo "├── controllers/" 
echo "├── middlewares/"
echo "├── models/"
echo "├── pages/"
echo "│   ├── home/"
echo "│   ├── login/"
echo "│   └── register/"
echo "├── routes/"
echo "├── services/"
echo "└── themes/"
echo ""
echo "🚀 Run with: flutter run lib/main_refactored.dart"
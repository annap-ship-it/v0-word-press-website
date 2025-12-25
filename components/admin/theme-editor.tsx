"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Palette, Code, Eye, Save, RotateCcw } from "lucide-react"

const defaultColors = {
  primary: "#ff6b35",
  secondary: "#004e89",
  accent: "#f7931d",
  background: "#ffffff",
  foreground: "#1a1a1a",
  muted: "#f4f4f5",
}

const defaultCss = `/* Custom CSS */
body {
  /* Add your custom styles here */
}

.custom-class {
  /* Example custom class */
}
`

export function ThemeEditor() {
  const [colors, setColors] = useState(defaultColors)
  const [customCss, setCustomCss] = useState(defaultCss)
  const [saving, setSaving] = useState(false)

  const handleColorChange = (key: string, value: string) => {
    setColors({ ...colors, [key]: value })
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      localStorage.setItem("theme_colors", JSON.stringify(colors))
      localStorage.setItem("theme_custom_css", customCss)
      alert("Theme saved successfully!")
    } catch (error) {
      alert("Failed to save theme")
    } finally {
      setSaving(false)
    }
  }

  const handleReset = () => {
    if (confirm("Reset to default theme? This will remove all customizations.")) {
      setColors(defaultColors)
      setCustomCss(defaultCss)
      localStorage.removeItem("theme_colors")
      localStorage.removeItem("theme_custom_css")
    }
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Appearance</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Customize your website theme and styles</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button onClick={handleSave} disabled={saving} className="bg-[#2271b1] hover:bg-[#135e96]">
            <Save className="w-4 h-4 mr-2" />
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="colors" className="space-y-6">
        <TabsList className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-1">
          <TabsTrigger value="colors" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Colors
          </TabsTrigger>
          <TabsTrigger value="css" className="flex items-center gap-2">
            <Code className="w-4 h-4" />
            Custom CSS
          </TabsTrigger>
          <TabsTrigger value="preview" className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="colors" className="space-y-4">
          <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold mb-4">Theme Colors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(colors).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 capitalize">
                    {key.replace(/([A-Z])/g, " $1")}
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="color"
                      value={value}
                      onChange={(e) => handleColorChange(key, e.target.value)}
                      className="h-12 w-16 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => handleColorChange(key, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm"
                      placeholder="#000000"
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold mb-4">Typography</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Font Family</label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                  <option>Inter (Default)</option>
                  <option>Roboto</option>
                  <option>Open Sans</option>
                  <option>Lato</option>
                  <option>Montserrat</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Base Font Size
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                  <option>14px</option>
                  <option>16px (Default)</option>
                  <option>18px</option>
                  <option>20px</option>
                </select>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="css">
          <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold mb-4">Custom CSS</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Add custom CSS to override default styles. Changes will be applied site-wide.
            </p>
            <textarea
              value={customCss}
              onChange={(e) => setCustomCss(e.target.value)}
              className="w-full h-[400px] px-4 py-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#2271b1]"
              placeholder="/* Add your custom CSS here */"
            />
            <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Note:</strong> Custom CSS is stored in browser localStorage. For production use, consider adding
                styles to your theme files.
              </p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="preview">
          <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold mb-4">Theme Preview</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(colors).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div
                      className="w-full h-20 rounded-lg mb-2 border border-gray-200 dark:border-gray-700"
                      style={{ backgroundColor: value }}
                    />
                    <p className="text-sm font-medium capitalize">{key.replace(/([A-Z])/g, " $1")}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">{value}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h4 className="font-semibold mb-4">Sample Elements</h4>
                <div className="space-y-4">
                  <button
                    className="px-4 py-2 rounded font-medium"
                    style={{ backgroundColor: colors.primary, color: "#ffffff" }}
                  >
                    Primary Button
                  </button>
                  <button
                    className="px-4 py-2 rounded font-medium ml-2"
                    style={{ backgroundColor: colors.secondary, color: "#ffffff" }}
                  >
                    Secondary Button
                  </button>
                  <button
                    className="px-4 py-2 rounded font-medium ml-2"
                    style={{ backgroundColor: colors.accent, color: "#ffffff" }}
                  >
                    Accent Button
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <div className="p-4 rounded" style={{ backgroundColor: colors.muted }}>
                  <h5 className="font-semibold mb-2" style={{ color: colors.foreground }}>
                    Sample Card
                  </h5>
                  <p className="text-sm" style={{ color: colors.foreground, opacity: 0.7 }}>
                    This is how your content will look with the current theme colors.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

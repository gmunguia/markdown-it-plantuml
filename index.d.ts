declare module 'markdown-it-plantuml' {
  import MarkdownIt from 'markdown-it/lib'
  import Renderer from 'markdown-it/lib/renderer'

  export interface PlantumlOptions {
    openMarker?: string
    closeMarker?: string
    generateSource?: (umlCode: string, pluginOptions: PlantumlOptions) => string
    diagramName?: string
    imageFormat?: string
    render?: Renderer
    server?: string
  }
  const markdownItPlantuml: MarkdownIt.PluginWithOptions<PlantumlOptions>
  export = markdownItPlantuml
}

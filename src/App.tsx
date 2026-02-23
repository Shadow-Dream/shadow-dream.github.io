import './App.css'

const highlights = [
  {
    title: '定位清晰',
    description: '聚焦于产品设计、前端工程与体验叙事，让作品自带方向感。'
  },
  {
    title: '输出稳定',
    description: '以短周期迭代为原则，持续发布可验证、可复用的成果。'
  },
  {
    title: '长期主义',
    description: '在职业与生活中保持韧性和节奏，把成长变成习惯。'
  }
]

const projects = [
  {
    title: 'Lightfield Studio',
    description: '一个专注于视觉叙事的创意工作流，从灵感收集到成品发布。',
    tags: ['产品设计', '前端开发', '品牌表达']
  },
  {
    title: 'Midnight Notes',
    description: '记录灵感与实验的数字花园，用结构化笔记连接长期目标。',
    tags: ['写作体系', '知识管理', 'UI 设计']
  },
  {
    title: 'Echo Lab',
    description: '通过快速原型验证新想法，把复杂体验拆解成可行动步骤。',
    tags: ['原型实验', '体验研究', '交互流程']
  }
]

const nowItems = [
  {
    title: '打造新的个人作品集版本',
    meta: '2026 Q1'
  },
  {
    title: '整理过去一年项目的复盘与经验',
    meta: '持续更新'
  },
  {
    title: '学习更系统的视觉叙事方法',
    meta: '本季度重点'
  }
]

const writings = [
  {
    title: '如何把灵感变成可交付的作品',
    description: '从模糊概念到输出，拆解我的三步工作流。'
  },
  {
    title: '一份更有温度的产品履历',
    description: '如何在作品集中讲清楚问题、过程与影响。'
  },
  {
    title: '效率系统之外，如何保持创造力',
    description: '在高强度产出下依然留出探索空间。'
  }
]

export default function App() {
  return (
    <div className="page">
      <div className="bg-orb orb-1" aria-hidden />
      <div className="bg-orb orb-2" aria-hidden />
      <div className="bg-grid" aria-hidden />

      <nav className="nav">
        <div className="logo">Shadow Dream</div>
        <div className="nav-links">
          <a href="#projects">Projects</a>
          <a href="#now">Now</a>
          <a href="#writing">Writing</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-content">
          <p className="eyebrow">Personal Studio</p>
          <h1>把灵感变成可触达的体验与作品。</h1>
          <p className="lead">
            你好，我是 Shadow Dream。这里是我的个人主页，用于展示项目、沉淀思考、记录当下。
          </p>
          <div className="actions">
            <a className="btn primary" href="#projects">查看作品</a>
            <a className="btn ghost" href="#contact">取得联系</a>
          </div>
          <div className="hero-meta">
            <div>
              <span className="meta-label">定位</span>
              <span>产品 / 体验 / 前端</span>
            </div>
            <div>
              <span className="meta-label">坐标</span>
              <span>远程 · 中国</span>
            </div>
            <div>
              <span className="meta-label">状态</span>
              <span>开放合作</span>
            </div>
          </div>
        </div>
      </header>

      <section className="section reveal">
        <h2>核心优势</h2>
        <div className="grid">
          {highlights.map((item, index) => (
            <article key={item.title} className={`card delay-${index + 1}`}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="projects" className="section reveal">
        <div className="section-head">
          <h2>精选项目</h2>
          <p>以叙事为核心，将复杂问题拆成可执行的体验模块。</p>
        </div>
        <div className="grid">
          {projects.map((project, index) => (
            <article key={project.title} className={`card project delay-${index + 1}`}>
              <div className="card-head">
                <h3>{project.title}</h3>
                <span className="dot" aria-hidden />
              </div>
              <p>{project.description}</p>
              <div className="tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="now" className="section reveal">
        <div className="section-head">
          <h2>正在进行</h2>
          <p>把近期目标公开记录，确保每周都有可见的进度。</p>
        </div>
        <div className="timeline">
          {nowItems.map((item, index) => (
            <div key={item.title} className={`timeline-item delay-${index + 1}`}>
              <div className="timeline-dot" aria-hidden />
              <div>
                <h3>{item.title}</h3>
                <span className="timeline-meta">{item.meta}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="writing" className="section reveal">
        <div className="section-head">
          <h2>最新文章</h2>
          <p>写作是整理思考的方式，也欢迎交流反馈。</p>
        </div>
        <div className="list">
          {writings.map((writing, index) => (
            <article key={writing.title} className={`list-item delay-${index + 1}`}>
              <div>
                <h3>{writing.title}</h3>
                <p>{writing.description}</p>
              </div>
              <span className="arrow">→</span>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="section reveal">
        <div className="cta">
          <div>
            <h2>一起创造新的故事线</h2>
            <p>如果你有项目或合作想法，欢迎随时联系我。</p>
          </div>
          <div className="actions">
            <a className="btn primary" href="mailto:hello@shadowdream.com">发送邮件</a>
            <a className="btn ghost" href="https://github.com/Shadow-Dream">GitHub</a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <span>© {new Date().getFullYear()} Shadow Dream</span>
        <span>Building thoughtful digital experiences.</span>
      </footer>
    </div>
  )
}

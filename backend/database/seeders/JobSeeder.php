<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Job;

class JobSeeder extends Seeder
{
    public function run(): void
    {
        $jobs = [
            [
                'title'        => 'Senior Frontend Developer',
                'company'      => 'TechCorp Solutions',
                'location'     => 'Dhaka, Bangladesh',
                'category'     => 'Engineering',
                'type'         => 'Full-time',
                'salary'       => '$60,000 - $80,000',
                'description'  => 'We are looking for an experienced Frontend Developer to join our growing team. You will be responsible for building and maintaining high-quality web applications using modern JavaScript frameworks.\n\nAs a Senior Frontend Developer, you will collaborate closely with our design and backend teams to deliver exceptional user experiences. You will mentor junior developers and contribute to technical decisions.',
                'requirements' => "• 5+ years of experience in frontend development\n• Strong proficiency in React.js or Next.js\n• Experience with TypeScript\n• Knowledge of Tailwind CSS or similar\n• Understanding of RESTful APIs\n• Excellent communication skills",
                'logo'         => null,
            ],
            [
                'title'        => 'Backend Laravel Developer',
                'company'      => 'Innovate BD',
                'location'     => 'Chittagong, Bangladesh',
                'category'     => 'Engineering',
                'type'         => 'Full-time',
                'salary'       => '$50,000 - $70,000',
                'description'  => 'Join our backend team to build scalable APIs and services using Laravel. You will work on exciting projects serving thousands of users daily.\n\nYou will be responsible for designing and implementing RESTful APIs, optimizing database queries, and ensuring the security and performance of our backend systems.',
                'requirements' => "• 3+ years of Laravel experience\n• Strong knowledge of MySQL or PostgreSQL\n• Experience with Redis\n• Understanding of microservices architecture\n• Good knowledge of Git",
                'logo'         => null,
            ],
            [
                'title'        => 'UI/UX Designer',
                'company'      => 'Creative Studio',
                'location'     => 'Remote',
                'category'     => 'Design',
                'type'         => 'Remote',
                'salary'       => '$45,000 - $65,000',
                'description'  => 'We are seeking a talented UI/UX Designer to create beautiful and functional user interfaces. You will work directly with clients and developers to bring designs to life.\n\nYou will conduct user research, create wireframes, prototypes, and high-fidelity designs using Figma.',
                'requirements' => "• 3+ years of UI/UX design experience\n• Proficiency in Figma\n• Strong portfolio of web and mobile designs\n• Understanding of user-centered design principles\n• Experience with design systems",
                'logo'         => null,
            ],
            [
                'title'        => 'Mobile App Developer (React Native)',
                'company'      => 'AppWorks Ltd',
                'location'     => 'Dhaka, Bangladesh',
                'category'     => 'Mobile',
                'type'         => 'Full-time',
                'salary'       => '$55,000 - $75,000',
                'description'  => 'We are hiring a React Native Developer to build cross-platform mobile applications. You will work on consumer-facing apps with millions of users.\n\nYou will build high-performance mobile apps, integrate with backend APIs, and maintain existing applications.',
                'requirements' => "• 2+ years of React Native development\n• Experience with iOS and Android platforms\n• Knowledge of Redux or Context API\n• Familiarity with native modules\n• Experience with app store deployment",
                'logo'         => null,
            ],
            [
                'title'        => 'Data Science Intern',
                'company'      => 'DataMind Analytics',
                'location'     => 'Dhaka, Bangladesh',
                'category'     => 'Data Science',
                'type'         => 'Internship',
                'salary'       => '$1,000 - $1,500/month',
                'description'  => 'Great opportunity for a motivated student to gain hands-on experience in data science and machine learning. You will work alongside experienced data scientists on real-world projects.\n\nYou will analyze datasets, build predictive models, and create data visualizations.',
                'requirements' => "• Pursuing or recently completed degree in CS or related field\n• Python programming skills\n• Knowledge of pandas, numpy, scikit-learn\n• Basic understanding of machine learning\n• Strong analytical thinking",
                'logo'         => null,
            ],
            [
                'title'        => 'DevOps Engineer',
                'company'      => 'CloudBase Inc',
                'location'     => 'Remote',
                'category'     => 'DevOps',
                'type'         => 'Remote',
                'salary'       => '$70,000 - $90,000',
                'description'  => 'We need a skilled DevOps Engineer to manage our cloud infrastructure and CI/CD pipelines. You will ensure high availability and performance of our systems.\n\nYou will work with AWS/GCP, manage Docker containers, configure Kubernetes clusters, and automate deployments.',
                'requirements' => "• 4+ years of DevOps experience\n• Strong knowledge of AWS or GCP\n• Experience with Docker and Kubernetes\n• Proficiency in CI/CD tools (Jenkins, GitHub Actions)\n• Infrastructure as Code (Terraform, Ansible)",
                'logo'         => null,
            ],
            [
                'title'        => 'Product Manager',
                'company'      => 'StartupHub BD',
                'location'     => 'Dhaka, Bangladesh',
                'category'     => 'Product',
                'type'         => 'Full-time',
                'salary'       => '$60,000 - $85,000',
                'description'  => 'Looking for an experienced Product Manager to lead our core product team. You will define product strategy, work with engineering and design, and drive product growth.\n\nYou will gather requirements, prioritize features, write PRDs, and work closely with all stakeholders.',
                'requirements' => "• 4+ years of product management experience\n• Strong analytical and problem-solving skills\n• Experience with agile methodologies\n• Excellent communication skills\n• Data-driven decision making",
                'logo'         => null,
            ],
            [
                'title'        => 'Content Writer (Tech)',
                'company'      => 'MediaTech Group',
                'location'     => 'Remote',
                'category'     => 'Marketing',
                'type'         => 'Part-time',
                'salary'       => '$25,000 - $35,000',
                'description'  => 'We are looking for a skilled tech content writer to produce engaging articles, blog posts, and documentation. You will write for our developer audience and general tech enthusiasts.\n\nYou will research and write high-quality content on software development, AI, and technology trends.',
                'requirements' => "• 2+ years of tech writing experience\n• Strong English writing skills\n• Understanding of software development concepts\n• SEO knowledge\n• Ability to meet deadlines",
                'logo'         => null,
            ],
        ];

        foreach ($jobs as $job) {
            Job::create($job);
        }
    }
}
